const models = require('../models');

function index(req, res) {
    models.Vehicle.findAll().then(result => {
        res.status(200).json({
            message: "OK",
            result: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went worng",
            error: error
        })
    });
}

function show(req,res,next){
    const id = req.params.id;
    models.Vehicle.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Post not found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went worng",
            error: error
        })
    });
}

module.exports = {
    index: index,
    show: show
}