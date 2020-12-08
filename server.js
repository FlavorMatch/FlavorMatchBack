const http = require("http");
const express = require("express");
const connection = require("./conn");
var cors = require('cors');

const app = express();

app.use(cors());

app.get("/flavorsByName", function(req, res) {
    connection.readData(req, res);    
});

app.get("/matchById", function(req, res) {
    connection.readList(req, res);    
});

var port = process.env.PORT || 3000;


http.createServer(app).listen (port, "0.0.0.0", function () {
    console.log ("Port 3000");
});