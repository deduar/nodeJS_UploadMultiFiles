const models = require('../models');

function index(req,res){
    res.json({
        message: "OK"
    })
}

function consult(req, res) {
    var brand = req.body.brand;
    var year = req.body.year;
    var model = req.body.model;
    var version = req.body.version;
    var fuel = req.body.fuel;
    //var transmision = req.body.transmision;
   
    models.Vehicle.findAll({attributes: ['model'],group: ['model'] ,where: {make: brand}}).then(result =>{
        res.json({data: result});
    }).catch(error => {
        res.json({message: "Error"});
    });
}

module.exports = {
    index: index,
    consult: consult
}