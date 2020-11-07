const http = require("http");
const express = require("express");
const mysql = require('mysql');
const app = express();

const con = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'root', // O usuário do banco. Ex: user 
    password: '', // A senha do usuário. Ex: user123
    database: 'flavor_match' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

app.get("/flavorsByName", function(req, res) {
    let name = req.query.name;   
    
    con.query(`select id, name from Flavor where name like '%${name}%'`, (err, rows) => {
        if (err) throw err

        res.json( rows );
    
    });
    
});

app.get("/matchById", function(req, res) {
    let id = req.query.id;
    
    con.query(`select flavor_id, f.name, count(*) as qtd_compounds from CompoundsFlavor cf 
    inner join Flavor f on cf.flavor_id = f.id where cf.compound_id in (select cf2.compound_id 
    from CompoundsFlavor cf2 where flavor_id = ${id}) and cf.flavor_id  <> ${id} group by flavor_id,
    f.name order by 3 desc;`, (err, rows) => {
        if (err) throw err

        res.json( rows );
    
    });
    
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));

