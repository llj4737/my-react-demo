const user = require("express").Router();
const request = require("request");

/**
 * 注册
 */
user.post("/register", function (req, res) {
    request.post("http://localhost:8080/register", {
        formData: req.body,
        headers: {
            "content-type": "application/json"
        },
        json: true
    }, function (err, response, body) {
        return res.json(body);
    });
});
/**
 * 登录
 */
user.post("/login", (req, res) => {
    request.post("http://localhost:8080/login", {
        formData: req.body,
        json: true
    }, function (err, response, body) {
        if(err) throw err;
        console.log(body)
        return res.json(body);
    });
});
/**
 * 获取用户信息
 */
user.get("/getUserInfo", (req, res) => {
    let url = "http://localhost:8080/getUserInfo?id=" + req.query.id;
    request(url, function (error, response, body) {
        if(error) throw error;
        return res.json(JSON.parse(body));
    })
})
/**
 * 更新用户
 */
user.post("/updateUser", (req, res) => {
    console.log(req.body)
    request.post("http://localhost:8080/updateUser", {
        formData: req.body,
        json: true
    }, function (error, response, body) {
        if(error) throw error;
        console.log(body);
        return res.json(body);
    })
});

module.exports = user;