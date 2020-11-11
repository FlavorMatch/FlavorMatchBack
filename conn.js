const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost', 
    user: 'root',  
    password: '', 
    database: 'flavor_match' 
});

exports.readData = (req, res) => {
    let name = req.query.name;
    var sql = "select id, name from Flavor where name like ?";
    
    con.query(sql, [`%${name}%`], function(err, rows) {
        if (err) throw err

        res.json( rows );
    
    });
}

exports.readList = (req, res) => {
    let id = req.query.id;
    var sql = "select flavor_id, f.name, count(*) as qtd_compounds from CompoundsFlavor cf inner join Flavor f on cf.flavor_id = f.id where cf.compound_id in (select cf2.compound_id from CompoundsFlavor cf2 where flavor_id = ?) and cf.flavor_id  <> ? group by flavor_id, f.name order by 3 desc";
    
    con.query(sql, [id, id], (err, rows) => {
        if (err) throw err

        res.json( rows );
    
    });
};