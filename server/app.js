const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
/**
 * cors解决跨域
 */
app.use(function (req, res, next) {
    if(req.headers.origin === "http://localhost:3000" || req.headers.origin === "http://localhost:3001"){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
    next();
})
// 路由
app.use("/", require("./user"));
app.use("/article", require("./article"));
app.use("/homeArticle", require("./homearticle"));

app.listen(8081);