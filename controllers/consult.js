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

async function consult(req, res) {
    var param = {
        makeId: req.body.brand,
        patternId: req.body.model,
        versionId: req.body.version,
        variation: {
            fuelId: req.body.variation.fuel,
            transmissionId: req.body.variation.transmission,
            bodyId: req.body.variation.body,
            yearId: req.body.variation.year,
            doors: req.body.variation.doors,
            numSeat: req.body.variation.numSeat,
            powerCV: req.body.variation.powerCV,
            powerKW: req.body.variation.powerKW
        }
    }

    if(param.makeId){
        if(param.patternId){
            if(param.versionId){
                var variations = await models.Variation.findAll({attributes:['carId','fuelId','transmissionId','yearId','bodyId','numSeat','doors','powerCV','powerKW'],where:{versionId:param.versionId}});
                var vars = [];
                for (const variation of variations){
                    var fuel = await models.Fuel.findAll({attributes:['id','description'],where:{id:variation.fuelId}});
                    var transmission = await models.Transmission.findAll({attributes:['id','description'],where:{id:variation.transmissionId}});
                    var body = await models.Body.findAll({attributes:['id','description'],where:{id:variation.bodyId}});
                    var year = await models.Year.findAll({attributes:['id','year'],where:{id:variation.yearId}});
                    var door = variation.doors;
                    var numSeat = variation.numSeat;
                    var powerCV = variation.powerCV;
                    var powerKW = variation.powerKW;
                    vars.push({fuel,transmission,body,year,door,numSeat,powerCV,powerKW});
                }
                res.status(200).json({vars});
                /*
                if(variations){
                    console.log(variations.length); // 3, 37, 617 -> 2 versions
                    var fuel = await models.Fuel.findAll({attributes:['id','description'],where:{id:variations[0].fuelId}});
                    res.status(200).json({variations,fuel});
                }
                */
            }else{
                var versions = await models.Version.findAll({attributes:['id','description'],where:{modelId:param.patternId}});
                if(versions){
                    res.status(200).json(versions);
                }
            }
        }else{
            var patters = await models.Pattern.findAll({attributes:['id','description'],where:{makeId:param.makeId}});
            if(patters){
                res.status(200).json(patters);
            }
        }
    }else{
        var makes = await models.Make.findAll({attributes:['id','description']});
        if(makes){
            res.status(200).json(makes);
        }
    }
    
    /*
    var brand = req.body.brand;
    var year = req.body.year;
    var model = req.body.model;
    var version = req.body.version;
    var fuel = req.body.fuel;
    var transmission = req.body.transmission;
    var body = req.body.body;
    */

    // Logica segun atributos
/*

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
    */

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