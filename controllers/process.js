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

            // Buscando Model (Pattern)
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

            // Buscando Version (description)
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

        }
        res.send('migrate succesfull');
    } catch (e) {
        res.send(e);
    }

}

module.exports = {
    index: index,
}