"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var response = [];
var apiUrl = "https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno";
axios_1.default
    .get(apiUrl)
    .then(function (res) {
    response = res.data;
    console.log("Response:", response);
})
    .catch(function (error) {
    console.error("Error:", error);
});
