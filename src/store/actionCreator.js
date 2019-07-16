import {CHANGE_USERNAME, SAVE_USER_LOGIN, SAVE_ARTICLE, SAVE_ARTICLE_HOME} from "./actionType"

export const saveUserActionCreator = (value) => ({
    type: SAVE_USER_LOGIN,
    value
});
export const changeUserNameActionCreator = (value) => ({
    type: CHANGE_USERNAME,
    value
});
export const saveArticleActionCreator = (value) => ({
    type: SAVE_ARTICLE,
    value
});