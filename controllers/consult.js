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
    data = ["1","2"];

    res.json({
        message: "OK",
        data: data
    })
}

module.exports = {
    index: index,
    consult: consult
}