const fs = require('fs');
const models = require('../models');

async function index(req, res) {
    try {
        var data = fs.readFileSync('./uploads/example.csv', 'utf8');    //File -> data
        data = data.split("\n");
        for (var i = 0; i < 20; i++) {
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

            //Buscando carID
            const findVehicle = await models.Vehicle.findAll({ attributes: ['carId'], attributes: ['carId'], where: { carId: vehicle.carId } });
            if (findVehicle.length == 0) {
                await models.Vehicle.create(vehicle);
            }

            //Buscando Make
            const findMake = await models.Make.findAll({ where: { description: vehicle.make }, group: ['description'] });
            if (findMake.length == 0) {
                var make = {
                    description: vehicle.make
                }
                const addMake = await models.Make.create(make);
                var makeId = addMake.id;
            } else {
                var makeId = findMake[0].id;
            }

            // Buscando Model (Pattern)
            const findModel = await models.Pattern.findAll({ where: { description: vehicle.model }, group: ['description'] });
            if (findModel.length == 0) {
                var patter = {
                    makeId: makeId,
                    description: vehicle.model
                }
                const addPatter = await models.Pattern.create(patter);
                var modelId = addPatter.id;
            } else {
                var modelId = findModel[0].id;
            }

            // Buscando Version (description)
            const findVersion = await models.Version.findAll({ where: { description: vehicle.description } });
            if (findVersion.length == 0) {
                var version = {
                    modelId: modelId,
                    description: vehicle.description
                }
                const addVersion = await models.Version.create(version);
                var modelId = addVersion.id;
            } else {
                var modelId = findVersion[0].id;
            }

            //Buscando Fuel
            const findFuel = await models.Fuel.findAll({ where: { description: vehicle.fuelType } });
            if (findFuel.length == 0) {
                var fuel = {
                    description: vehicle.fuelType
                }
                const addFuel = await models.Fuel.create(fuel);
                var fuelId = addFuel.id;
            } else {
                var fuelId = findFuel[0].id;
            }

            //Buscando Transmission
            const findTransmission = await models.Transmission.findAll({ where: { description: vehicle.transmision } });
            if (findTransmission.length == 0) {
                var trasmission = {
                    description: vehicle.transmision
                }
                const addTransmission = await models.Transmission.create(trasmission);
                var transmissionId = addTransmission.id;
            } else {
                var transmissionId = findTransmission[0].id;
            }

            //Buscando Year
            const findYear = await models.Year.findAll({ where: { year: vehicle.year } });
            if (findYear.length == 0) {
                var year = {
                    year: vehicle.year
                }
                const addYear = await models.Year.create(year);
                var yearId = addYear.id;
            } else {
                var yearId = findYear[0].id;
            }

            //Buscando Body (bodyStyle)
            const findBody = await models.Body.findAll({ where: { description: vehicle.bodyStyle } });
            if (findBody.length == 0) {
                var body = {
                    description: vehicle.bodyStyle
                }
                const addBody = await models.Body.create(body);
                var bodyId = addBody.id;
            } else {
                var bodyId = findBody[0].id;
            }

            //Buscando Variation
            const findVariation = await models.Variation.findAll({where:{versionId:modelId,fuelId:fuelId,transmissionId:transmissionId,yearId: yearId,bodyId:bodyId}});
            if(findVariation.length == 0){
                var variation = {
                    carId: vehicle.carId,
                    versionId: modelId,
                    fuelId: fuelId,
                    transmissionId: transmissionId,
                    yearId: yearId,
                    bodyId: bodyId,
                    numSeat: vehicle.numSeat,
                    doors: vehicle.doors,
                    powerCV: vehicle.powerCV,
                    powerKW: vehicle.powerKW
                }
                await models.Variation.create(variation);
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