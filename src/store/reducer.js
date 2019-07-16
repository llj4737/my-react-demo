import { SAVE_USER_LOGIN, CHANGE_USERNAME, SAVE_ARTICLE} from "./actionType";
const loginInfo = JSON.parse(sessionStorage.getItem("login")) || [];
const defaultState = {
    userId: loginInfo.id || 1,
    username: loginInfo.username || "",
    isLogin: loginInfo.isLogin || false,
    article: "",
}

export default (state = defaultState, action) => {
    if(action.type === SAVE_USER_LOGIN){
        let newState = JSON.parse(JSON.stringify(state));
        newState.userId = action.value.id;
        newState.username = action.value.username;
        newState.isLogin = true;
        return newState;
    }
    if(action.type === CHANGE_USERNAME){
        let newState = JSON.parse(JSON.stringify(state));
        newState.username = action.value;
        return newState;
    }
    if(action.type === SAVE_ARTICLE){
        let newState = JSON.parse(JSON.stringify(state));
        newState.article = action.value;
        return newState;
    }
    return state;
}