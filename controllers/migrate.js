const models = require('../models');
const mysql = require('mysql2/promise');
const { sequelize } = require('../models');
const { response } = require('express');
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
    var newPost = {}

    wp_posts[0].forEach(post => {
        var make = post.post_title.split(' ')[0];
        models.make.findAll({ attributes: ['id'], limit: 1, where: sequelize.where(sequelize.fn('LCASE', sequelize.col('description')), 'LIKE', '%' + make + '%') }).then(resultMakeId => {
            if (resultMakeId.length > 0) {
                var pattern = post.post_title.split(' ')[1];
                models.pattern.findAll({ attributes: ['id'], limit: 1, where: { makeId: resultMakeId[0].id, $and: sequelize.where(sequelize.fn('LCASE', sequelize.col('description')), 'LIKE', '%' + pattern + '%') } }).then(resultpatternId => {
                    if (resultpatternId.length > 0) {
                        conn.query('SELECT `meta_value` FROM `optnc_postmeta` WHERE `meta_key`=\'matricula\' AND `post_id`= ' + post.ID).then(register => {
                            if (register.length > 0) {
                                conn.query('SELECT `meta_value` FROM `optnc_postmeta` WHERE `meta_key`=\'combustibe\' AND `post_id`= ' + post.ID).then(combustible => {
                                    if (combustible.length > 0) {
                                        newPost = {
                                            carId: 'WP_' + post.ID + '_' + post.post_author,
                                            make: resultMakeId[0].id,
                                            model: resultpatternId[0].id,
                                            register: register[0][0].meta_value,
                                            combustible: combustible[0]
                                        }
                                        console.log(newPost);
                                    }
                                }).catch(error => {
                                    console.log(error);
                                });
                            }
                        }).catch(error => {
                            console - log(error);
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        }).catch(error => {
            console.log(error);
        })
    });

    res.status(200).json({ message: "ok" });

}


async function test(req, res) {
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

    console.log(wp_posts[0].length);

    Promise.resolve('SELECT `meta_value` FROM `optnc_postmeta` WHERE `meta_key`=\'matricula\' AND `post_id`='+wp_posts[0][0].ID).then(function (value) {
        console.log(conn.query(value)); // "Success"
    }, function (value) {
        // not called
    });

    res.status(200).json({ message: "OK" });
}

module.exports = {
    index: index,
    test: test
}