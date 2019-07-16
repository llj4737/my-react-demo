import React from 'react';
import "./article.scss"
import {Button, Card, Drawer, Form, Icon, Input, Modal, Select} from "antd";
import {EditorState, convertToRaw, ContentState, convertFromHTML} from "draft-js"
import {Editor} from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import axios from "axios";
import store from "../../store";
import {saveArticleActionCreator} from "../../store/actionCreator";
const { Option, OptGroup } = Select;
class Article extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            content: "",
            backContent: store.getState().article,
            visible: false,
            confirmLoading: false,
            title: "",
            category: "感动心灵"
        };
        store.subscribe(this.storeChange);
    }
    onEditorStateChange:Function = (editorState) => {
        this.setState({
            editorState
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    }
    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let img = new Image();
            // let url = ''
            reader.onload = function (e) {
                img.src = this.result
            };

            img.onload = function () {
                //console.log(img); // 获取图片
                // console.log(img.src.length)
                // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');

                // 图片原始尺寸
                let originWidth = this.width;
                let originHeight = this.height;

                // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                let maxWidth = 400,
                    maxHeight = 500;
                // 目标尺寸
                let targetWidth = originWidth,
                    targetHeight = originHeight;
                // 图片尺寸超过300x300的限制
                if(originWidth > maxWidth || originHeight > maxHeight) {
                    if(originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

                //压缩后的图片转base64 url
                /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
                  * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
                let newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式

                resolve({
                    data: {
                        link: newUrl
                    }
                })

                //也可以把压缩后的图片转blob格式用于上传
                // canvas.toBlob((blob)=>{
                //     console.log(blob)
                //     //把blob作为参数传给后端
                // }, 'image/jpeg', 0.92)
            }
        }
    )
    storeChange = () => {
        this.setState({
            backContent: store.getState().article
        });
    }
    render(){
        const { visible, confirmLoading } = this.state;
        return (
            <div className={"admin-article"}>
                <Card
                    title="发表文章"
                    style={{ width: "100%", height: "100%" }}
                >
                    <div className={"publish-article"}>
                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName={"contract-template-add-wraper"}
                            toolbarClassName="home-toolbar"
                            editorClassName={"contract-template-editor"}
                            onEditorStateChange={this.onEditorStateChange}
                            localization={{ locale: 'zh' }}
                            toolbar={{ //Editor富文本组件功能控制
                                history: { inDropdown: true },
                                inline: { inDropdown: false },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                image: {
                                    urlEnabled: true,
                                    uploadEnabled: true,
                                    alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
                                    uploadCallback: this.imageUploadCallBack,  //图片的处理 （但是仅限于本地上传的，url方式不经过此函数）
                                    previewImage: true,
                                    inputAccept: 'image/*',
                                    alt: {present: false, mandatory: false}
                                },
                            }}
                        />
                        <div className={"save-submit"}>
                            <Button type="primary" onClick={this.showModal}>提交</Button>
                            <Button type="primary" onClick={this.saveArticle}>保存</Button>
                        </div>
                        {visible && <Modal
                            title="Title"
                            visible={visible}
                            onOk={this.handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={this.handleCancel}
                        >
                            <div><span style={{fontWeight: "bold"}}>标题: </span>
                                <Input onChange={(e) => this.handleInput(e)} style={{margin: "10px 0"}} placeholder="请输入文章内容" />
                                <span style={{fontWeight: "bold"}}>分类: </span>
                                <br/>
                                <Select
                                    showSearch
                                    style={{ width: "100%", marginTop: 10 }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={(value) => this.handleChange(value)}
                                    defaultValue={this.state.category}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="感动心灵">感动心灵</Option>
                                    <Option value="社会正能量">社会正能量</Option>
                                    <Option value="推荐阅读">推荐阅读</Option>
                                </Select>
                            </div>
                        </Modal>}
                    </div>
                </Card>
            </div>

        )
    }
    handleChange = (value) => {
        this.setState({
            category: value
        });
    }
    handleInput = (e) => {
        this.setState({
            title: e.target.value
        });
    }
    componentDidMount() {
        let {backContent} = this.state;
        if (backContent) {
            // 匹配富文本编辑器格式，回显保存的内容
            const contentBlock = htmlToDraft(backContent);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({ editorState })
            }
        }
    }
    saveArticle = () => {
        var editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        const action = saveArticleActionCreator(editorContent);
        store.dispatch(action);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    insertArticle = () => {
        const {title, category} = this.state;
        if(!title) return;
        var content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        console.log(content)
        if(content === "<p></p>") return;
        let data = JSON.stringify({title, content, category, id: store.getState().userId});
        axios.post("http://localhost:8081/article/insertArticle", data, {
            headers:{
                "Content-Type": "application/json;charset=utf-8"
            }}).then(result => {
                console.log(result);
        });
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        this.insertArticle();
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
}
const WrappedHorizontalLoginForm = Form.create({ name: 'article' })(Article);
export default WrappedHorizontalLoginForm;