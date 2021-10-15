const fs = require('fs');
const models = require('../models');

async function index(req, res) {
    try {
        var data = fs.readFileSync('./uploads/example.csv', 'utf8');    //File -> data
        data = data.split("\n");
        for (var i = 0; i < data.length; i++) {
            line = data[i].split('|');
            var vehicle = {
                carId: line[1],
                make: line[2],
                model: line[3],
                description: line[4],
                segment: line[5],
                vehicleType: line[6],
                bodyStyle: line[7],
                doors: line[12],
                numSeat: line[13],
                fuelType: line[15],
                powerCV: line[17],
                powerKW: line[19],
                transmision: line[40],
                introductionDate: line[8].split('-')[0],
                endDat: line[9].split('-')[0],
                modificationDate: line[10].split('-')[0],
                modelYear: line[70],
                modelIntroductionYear: line[71]
            }

            //Buscando carID
            const findVehicle = await models.vehicle.findAll({ attributes: ['carId'], attributes: ['carId'], where: { carId: vehicle.carId } });
            if (findVehicle.length == 0) {
                await models.vehicle.create(vehicle);
            }

            //Buscando VehicleType
            const findVehicleType = await models.vehicleType.findAll({ where: { v_type: vehicle.vehicleType } });
            if (findVehicleType.length == 0) {
                (vehicle.vehicleType == "C") ? desc = "Comercial" : desc = "Particular";
                var vehicleType = {
                    v_type: vehicle.vehicleType,
                    description: desc
                }
                const addVehicleType = await models.vehicleType.create(vehicleType);
                var vehicleTypeId = addVehicleType.id;
            } else {
                var vehicleTypeId = findVehicleType[0].id;
            }

            //Buscando Make
            const findMake = await models.make.findAll({ where: { description: vehicle.make }, group: ['description'] });
            if (findMake.length == 0) {
                var make = {
                    vehicleTypeId: vehicleTypeId,
                    description: vehicle.make
                }
                const addMake = await models.make.create(make);
                var makeId = addMake.id;
            } else {
                var makeId = findMake[0].id;
            }

            // Buscando Model (Pattern)
            const findModel = await models.pattern.findAll({ where: { description: vehicle.model }, group: ['description'] });
            if (findModel.length == 0) {
                var patter = {
                    makeId: makeId,
                    description: vehicle.model
                }
                const addPatter = await models.pattern.create(patter);
                var modelId = addPatter.id;
            } else {
                var modelId = findModel[0].id;
            }

            // Buscando Version (description)
            const findVersion = await models.version.findAll({ where: { description: vehicle.description } });
            if (findVersion.length == 0) {
                var version = {
                    modelId: modelId,
                    description: vehicle.description
                }
                const addVersion = await models.version.create(version);
                var versionId = addVersion.id;
            } else {
                var versionId = findVersion[0].id;
            }

            //Buscando Segment
            const findSegment = await models.segment.findAll({ where: { description: vehicle.segment } });
            if (findSegment.length == 0) {
                var segment = {
                    description: vehicle.segment
                }
                const addSegment = await models.segment.create(segment);
                var segmentId = addSegment.id;
            } else {
                var segmentId = findSegment[0].id;
            }

            //Buscando Fuel
            const findFuel = await models.fuel.findAll({ where: { description: vehicle.fuelType } });
            if (findFuel.length == 0) {
                var fuel = {
                    description: vehicle.fuelType
                }
                const addFuel = await models.fuel.create(fuel);
                var fuelTypeId = addFuel.id;
            } else {
                var fuelTypeId = findFuel[0].id;
            }

            //Buscando Transmission
            const findTransmission = await models.transmission.findAll({ where: { description: vehicle.transmision } });
            if (findTransmission.length == 0) {
                var trasmission = {
                    description: vehicle.transmision
                }
                const addTransmission = await models.transmission.create(trasmission);
                var transmisionId = addTransmission.id;
            } else {
                var transmisionId = findTransmission[0].id;
            }
            /*
                        //Buscando Year
                        const findYear = await models.year.findAll({ where: { year: vehicle.year } });
                        if (findYear.length == 0) {
                            var year = {
                                year: vehicle.year
                            }
                            const addYear = await models.year.create(year);
                            var yearId = addYear.id;
                        } else {
                            var yearId = findYear[0].id;
                        }
            */
            //Buscando Body (bodyStyle)
            const findBody = await models.body.findAll({ where: { description: vehicle.bodyStyle } });
            if (findBody.length == 0) {
                var body = {
                    description: vehicle.bodyStyle
                }
                const addBody = await models.body.create(body);
                var bodyStyleId = addBody.id;
            } else {
                var bodyStyleId = findBody[0].id;
            }

            //Buscando Variation
            //const findVariation = await models.variation.findAll({where:{versionId:modelId,fuelId:fuelId,transmissionId:transmissionId,yearId: yearId,bodyId:bodyId}});
            const findVariation = await models.variation.findAll({ where: { carId: vehicle.carId } });
            if (findVariation.length == 0) {
                var variation = {
                    carId: vehicle.carId,
                    makeId: makeId,
                    modelId: modelId,
                    descriptionId: versionId,
                    segmentId: segmentId,
                    vehicleTypeId: vehicleTypeId,
                    bodyStyleId: bodyStyleId,
                    fuelTypeId: fuelTypeId,
                    transmisionId: transmisionId,
                    numSeat: vehicle.numSeat,
                    powerCV: vehicle.powerCV,
                    powerKW: vehicle.powerKW,
                    doors: vehicle.doors,
                    introductionDate: vehicle.introductionDate,
                    endDat: vehicle.endDat,
                    modificationDate: vehicle.modificationDate,
                    modelYear: vehicle.modelYear,
                    modelIntroductionYear: vehicle.modelIntroductionYear
                }
                await models.variation.create(variation);
            }

        }
        res.send('Migration succesfull');
    } catch (e) {
        res.send(e);
    }

}

module.exports = {
    index: index,
}