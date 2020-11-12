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

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));
