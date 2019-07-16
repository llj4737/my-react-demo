const article = require("express").Router();
const request = require("request");

/**
 * 添加数据
 */
article.post("/insertArticle", (req, res) => {
    console.log(req.body);
    request.post("http://localhost:8080/article/insertArticle", {
        formData: req.body,
        json: true
    }, function (error, response, body) {
        if(error) throw error;
        console.log(body);
        return res.json(body);
    });
});
/**
 * 获取数据
 */
article.get("/getArticleList", (req, res) => {
    let url = "http://localhost:8080/article/getArticleList?id=" + req.query.id;
    request(url, function (err, request, body) {
        if(err) throw err;
        return res.json(body);
    });
});
/**
 * 删除文章
 */
article.get("/deleteArticle", (req, res) => {
    let url = "http://localhost:8080/article/deleteArticle?a_id=" + req.query.a_id;
    console.log(url);
    request(url, function(err, request, body){
        if(err) throw err;
        return res.json(body);
    });
});
/**
 * 通过文章a_id获取文章
 */
article.get("/getArticleById", (req, res) => {
    console.log(req.query.a_id);
    let url = "http://localhost:8080/article/getArticleById?a_id=" + req.query.a_id;
    request(url, function(err, request, body){
        if(err) throw err;
        return res.json(body);
    });
})




module.exports = article;