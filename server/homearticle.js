const homeArticle = require("express").Router();
const request = require("request");

homeArticle.post("/movingheart", (req, res) => {
    let url = "http://localhost:8080/homeArticle/movingheart";
    request.post(url,{
        formData: req.body,
        json: true
    }, function (error, response, body) {
        if(error) throw error;
        return res.json(body);
    });
});

homeArticle.post("/movingheart", (req, res) => {
    let url = "http://localhost:8080/homeArticle/movingheart";
    request.post(url,{
        formData: req.body,
        json: true
    }, function (error, response, body) {
        if(error) throw error;
        return res.json(body);
    });
});






module.exports = homeArticle;