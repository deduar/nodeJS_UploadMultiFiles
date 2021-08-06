const models = require('../models');

function index(req,res){
    models.Vehicle.findAll().then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Data not found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went worng",
            error: error
        })
    });
}

function consult(req, res) {
    var brand = req.body.brand;
    var year = req.body.year;
    var model = req.body.model;
    var version = req.body.version;
    var fuel = req.body.fuel;
   
    // Logica segun atributos
    if (!brand && !model && !version && !year){
        models.Vehicle.findAll({attributes: [['make','brand']],group: ['make']}).then(result => {
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({
                    message: "Data not found!"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });
    }else if (brand && !model && !version && !year){
        models.Vehicle.findAll({attributes: [['model','model']],group: ['model'],where: {make: brand}}).then(result => {
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({
                    message: "Data not found!"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });
    }else if (brand && model && !version && !year){
        models.Vehicle.findAll({attributes: [['description','version']],group: ['description'],where: {make: brand, model: model}}).then(result => {
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({
                    message: "Data not found!"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });
    }else if (brand && model && version && !year){
        models.Vehicle.findAll({attributes: [['year','year']],group: ['year'],where: {make: brand, model: model, description: version }}).then(result => {
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({
                    message: "Data not found!"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });
    }else if (brand && model && version && year){
        models.Vehicle.findAll({where: {make: brand, model: model, description: version, year: year }}).then(result => {
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({
                    message: "Data not found!"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });
    }else{
        res.json({
            message: "Fail"
        })
    }
}

function show(req, res) {
    const vehicleId = req.params.vehicleId;
    models.Vehicle.findByPk(vehicleId).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Data not found!"
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
    consult: consult,
    show: show
}