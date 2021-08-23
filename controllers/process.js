const fs = require('fs');
const models = require('../models');


function index(req, res) {
    var data = fs.readFileSync('./uploads/example.csv', 'utf8');    //File -> data
    data = data.split("\n");
    for (var i = 0; i < data.length; i++) {
        line = data[i].split(';');
        var vehicle = {
            carId: line[1],
            make: line[2],
            model: line[3],
            description: line[4],
            segment: line[5],
            vehicleType: line[6],
            bodyStyle: line[7],
            doors: line[9],
            numSeat: line[10],
            fuelType: line[12],
            powerCV: line[14],
            powerKW: line[16],
            transmision: line[43],
            year: line[82]
        }
        models.Vehicle.create(vehicle);
    }
    res.json({
        message: "OK"
    })
}

async function splitMark(req, res) {
    const allVehiclesMark = await models.Vehicle.findAll({ attributes: ['make'], group: ['make'] });
    for (let index = 0; index < allVehiclesMark.length; index++) {
        models.Make.findAll({ attributes: ['description'], where: { description: allVehiclesMark[index].make } }).then(result => {
            if (result.length == 0) {
                var newMark = {
                    description: allVehiclesMark[index].make
                };
                models.Make.create(newMark).then(result => {
                    if (result) {
                        res.status(200);
                    }
                }).catch(error => {
                    res.status(500).json({
                        message: "Something went worng",
                        error: error
                    })
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });
    }

    res.json({
        message: "OK"
    })
}

async function splitModel(req, res) {
    const allVehiclesMark = await models.Make.findAll();
    const allVehiclesModels = await models.Vehicle.findAll({ attributes: ['make', 'model'], group: ['model'], order: ['make'] });
    for (let index = 0; index < allVehiclesModels.length; index++) {
        models.Pattern.findAll({ where: { 'description': allVehiclesModels[index].model } }).then(result => {
            if (result.length == 0) {
                for (let index2 = 0; index2 < allVehiclesMark.length; index2++) {
                    if (allVehiclesModels[index].make == allVehiclesMark[index2].description) {
                        //allVehiclesModels[index].make = allVehiclesMark[index2].id;
                        var newPattern = {
                            makeId: allVehiclesMark[index2].id,
                            description: allVehiclesModels[index].model
                        }
                        break;
                    }
                }
                models.Pattern.create(newPattern).then(result => {
                    if (result) {
                        res.status(200);
                    }
                }).catch(error => {
                    res.status(500).json({
                        message: "Something went worng",
                        error: error
                    })
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });
    }

    res.json({
        message: "OK"
    })
}


async function splitVersion(req, res) {
    const allVehiclesModels = await models.Pattern.findAll();
    const allVehiclesVersions = await models.Vehicle.findAll({ attributes: ['model', 'description'], order: ['model'] });

    for (let index = 0; index < allVehiclesVersions.length; index++) {
        models.Version.findAll({ where: { 'description': allVehiclesModels[index].description } }).then(result => {
            if (result.length == 0) {
                for (let index2 = 0; index2 < allVehiclesModels.length; index2++) {
                    if (allVehiclesVersions[index].model == allVehiclesModels[index2].description) {
                        var newVersion = {
                            modelId: allVehiclesModels[index2].id,
                            description: allVehiclesVersions[index].description
                        }
                        break;
                    }
                }
                models.Version.create(newVersion).then(result => {
                    if (result) {
                        res.status(200);
                    }
                }).catch(error => {
                    res.status(500).json({
                        message: "Something went worng",
                        error: error
                    })
                });
            }else{
                console.log('Nothing to doing');
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });

    }


    res.json({
        message: "OK"
    })
}

module.exports = {
    index: index,
    splitMark: splitMark,
    splitModel: splitModel,
    splitVersion: splitVersion
}