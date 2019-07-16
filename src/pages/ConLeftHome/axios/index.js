import axios from "axios";

export default function (category) {
    let data = JSON.stringify({category});
    return axios.post("http://localhost:8081/homeArticle/movingheart", data, {
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });
}