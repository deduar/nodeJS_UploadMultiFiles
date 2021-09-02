const models = require('../models');
const mysql = require('mysql2/promise');
const { sequelize } = require('../models');
const dbconfig = require(__dirname + '/../config/db.config.json');

async function index(req, res) {

    const conn = await mysql.createConnection({
        host: dbconfig.HOST,
        user: dbconfig.USER,
        password: dbconfig.PASSWORD,
        database: dbconfig.DB
    });

    await conn.connect(error => {
        if (error) throw error;
        console.log("Successfully connected to the database.");
    });

    const wp_posts = await conn.query('SELECT * FROM optnc_posts WHERE `post_type`=\'product\' AND `post_author`!=1');
    if (wp_posts) {
        wp_posts[0].forEach(post => {
            var make = post.post_title.split(' ')[0];
            var pattern = post.post_title.split(' ')[1];
            var version = post.post_title.split(' ').slice(3,).join();
            models.Make.findAll({ attributes: ['id'], limit: 1, where: sequelize.where(sequelize.fn('LCASE', sequelize.col('description')), 'LIKE', '%' + make + '%') }).then(makeId => {
                if(makeId.length > 0){
                    console.log(makeId[0].id);
                }
            }).catch(error => {
                console.log(error);
            });
        });
    }

    /*
    conn.query('SELECT * FROM optnc_posts WHERE `post_type`=\'product\' AND `post_author`!=1', (err, res) => {
        if(err){
            console.log("error: ", err);
        }
        var post_title_out = [];
        res.forEach(post => {
            var post_title = post.post_title.split(' ');
            models.Make.findAll({attributes:['id'],where:{description:post_title[0]}}).then(result => {
                if(result.length){
                    console.log(result[0].id);
                }
            }).catch(error => {
                console.log(error);
            })
        }); 
    });
    */

    res.status(200).json({
        message: "OK migrate"
    });

}

module.exports = {
    index: index
}