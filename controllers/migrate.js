const models = require('../models');
const mysql = require('mysql2/promise');
const { sequelize } = require('../models');
const { response } = require('express');
const dbconfig = require(__dirname + '/../config/db.config.json');


async function index (req,res){
    try{
        //Create connectio
        const conn = await mysql.createConnection({
            host: dbconfig.HOST,
            user: dbconfig.USER,
            password: dbconfig.PASSWORD,
            database: dbconfig.DB
        });

        //Make connection
        await conn.connect(error => {
            if (error){
                console.log("Connecton Failed");
            }else{
                console.log("Successfully connected to the database.");
            }
        });

        //All posts
        const wp_posts = await conn.query('SELECT * FROM optnc_posts WHERE `post_type`=\'product\' AND `post_author`!=1');
        //Each post
        wp_posts[0].forEach(function(post, index_post) {     
                if(index_post === 3) throw BreakException;
                conn.query('SELECT meta_key,meta_value FROM `optnc_postmeta` WHERE `post_id`= ' + post.ID).then(post_meta => {
                    //All post_meta of each postm
                    //post_meta[0].forEach(async function(meta) {  
                        //const make = await models.make.findAll({attributes: ['id','description'], where: {description: meta.meta_value}});
                        //console.log(index_meta,'-',meta.meta_key);
                        //const model = await models.pattern.findAll({attributes: ['id','description']});
                        //const version = await models.version.findAll({attributes: ['id','description']});
                        //const body = await model.body.findAll({attributes: ['id','description']});
                        //console.log(make[0].description,'-',model[0].description,'-',version[0].description,'-');
                    //})
                    post_meta[0].forEach(async function(meta) {
                        if(meta.meta_key == 'marca'){
                            var  make_id = await models.make.findAll({attributes: ['id'], where: {description:meta.meta_value}});
                            if(make_id.length > 0){
                                var make = make_id[0].id;
                            }else{
                                var make = null;
                            }
                        }
                        if (make){
                            console.log(make);
                        }
                    });
                    //console.log('---------');
                }).catch(error => {
                    console.log(error);
                });
        });
        res.status(200).json({message: "ok"});
    }
    catch(e){
        res.status(500).json({error: e})
    }
}


async function index_orig (req, res) {

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
                                conn.query('SELECT meta_key,meta_value FROM `optnc_postmeta` WHERE `post_id`= ' + post.ID).then(meta_values => {
                                    meta_values.forEach(meta_value => {
                                        meta_value.forEach(element => {
                                            switch (element.meta_key) {
                                                case '_price':
                                                    price = element.meta_value;
                                                    break;
                                                case 'km':
                                                    km = element.meta_value
                                                    break;
                                                case 'ano_matriculacion':
                                                    //ano_matriculacion = element.meta_value
                                                    const result = models.year.findAll({attributes:['id'],where: {year:element.meta_value}});
                                                    if(result.length > 0){
                                                        ano_matriculacion = result;
                                                        console.log(ano_matriculacion);
                                                    }
                                                    break;
                                                case 'potencia':
                                                    potencia = element.meta_value
                                                    break;
                                                case 'acabado':
                                                    acabado = element.meta_value
                                                    break;
                                                case 'matricula':
                                                    matricula = element.meta_value
                                                    break;
                                                case 'tipo':
                                                    tipo = element.meta_value
                                                    break;
                                                case 'combustible':
                                                    combustible = element.meta_value
                                                    break;
                                                case 'caja_cambios':
                                                    caja_cambios = element.meta_value
                                                    break;
                                                case 'puertas':
                                                    puertas = element.meta_value
                                                    break;
                                                case 'plazas':
                                                    plazas = element.meta_value
                                                    break;
                                                case 'color':
                                                    color = element.meta_value
                                                    break;
                                                case 'provincia':
                                                    provincia = element.meta_value
                                                    break;
                                                default:
                                                    break;
                                            }
                                        });
                                        /*
                                        newPost = {
                                            carId: 'WP_' + post.ID + '_' + post.post_author,
                                            make: resultMakeId[0].id,
                                            model: resultpatternId[0].id,
                                            price: price,
                                            km: km,
                                            ano_matriculacion: ano_matriculacion,
                                            potencia: potencia,
                                            acabado: acabado,
                                            matricula: matricula,
                                            tipo: tipo,
                                            combustible: combustible,
                                            caja_cambios: caja_cambios,
                                            puertas: puertas,
                                            plazas: plazas,
                                            color: color,
                                            provincia: provincia
                                        }
                                        */
                                    });
                                    //console.log(newPost);
                                }).catch(error => {
                                    console.log(error)
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

module.exports = {
    index: index
}