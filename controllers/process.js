const fs = require('fs');
const models = require('../models');


async function index(req, res) {
    try {
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
            

            const addVehicle = await models.Vehicle.create(vehicle);

            //Buscando Make
            const findMake = await models.Make.findAll({where: {description:vehicle.make}, group:['description']});
            if(findMake.length == 0){
                var make = {
                    description: vehicle.make
                }
                const addMake = await models.Make.create(make);
                var makeId = addMake.id;
            }else{
                var makeId = findMake[0].id;
            }

            // Buscando Model
            const findModel = await models.Pattern.findAll({where: {description:vehicle.model}, group:['description']});
            if(findModel.length == 0){
                var patter = {
                    makeId: makeId,
                    description: vehicle.model
                }
                const addPatter = await models.Pattern.create(patter);
                var modelId = addPatter.id;
            }else{
                var modelId = findModel[0].id;
            }

            // Buscando Version
            const findVersion = await models.Version.findAll({where: {description:vehicle.description}, group:['description']});
            if(findVersion.length == 0){
                var version = {
                    modelId: modelId,
                    description: vehicle.description
                }
                const addVersion = await models.Version.create(version);
                var versionId = addVersion.id;
            }else{
                var versionId = findVersion[0].id;
            }
            
            console.log(versionId);

        }
        res.send('migrate succesfull');
    } catch (e) {
        res.send(e);
    }

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
            } else {
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