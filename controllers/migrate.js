const models = require('../models');
const mysql = require('mysql2');
const dbconfig = require(__dirname + '/../config/db.config.json');

function index(req, res) {

    const con = mysql.createConnection({
        host: dbconfig.HOST,
        user: dbconfig.USER,
        password: dbconfig.PASSWORD,
        database: dbconfig.DB
    });

    con.connect(error => {
        if (error) throw error;
        console.log("Successfully connected to the database.");
    });

    con.query('SELECT * FROM optnc_posts WHERE `post_type`=\'product\' AND `post_author`!=1', (err, res) => {
        if(err){
            console.log("error: ", err);
        }
        console.log("posts: ",res.length);
    });

    res.status(200).json({
        message: "OK migrate"
    });
}

module.exports = {
    index: index
}