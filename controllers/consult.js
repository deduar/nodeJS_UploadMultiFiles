const models = require('../models');

function index(req, res) {
    models.Vehicle.findAll().then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
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
        versionId: req.body.version
    }

    if (param.makeId) {
        if (param.patternId) {
            if (param.versionId) {
                var variations = await models.Variation.findAll({ attributes: ['carId', 'fuelId', 'transmissionId', 'yearId', 'bodyId', 'numSeat', 'doors', 'powerCV', 'powerKW'], where: { versionId: param.versionId } });
                var vars = [];
                if (variations) {
                    for (const variation of variations) {
                        var fuel = await models.Fuel.findAll({ attributes: ['id', 'description'], where: { id: variation.fuelId } });
                        var transmission = await models.Transmission.findAll({ attributes: ['id', 'description'], where: { id: variation.transmissionId } });
                        var body = await models.Body.findAll({ attributes: ['id', 'description'], where: { id: variation.bodyId } });
                        var year = await models.Year.findAll({ attributes: ['id', 'year'], where: { id: variation.yearId } });
                        var numDoors = variation.doors;
                        var numSeats = variation.numSeat;
                        var powerCV = variation.powerCV;
                        var powerKW = variation.powerKW;
                        vars.push({ fuel, transmission, body, year, numDoors, numSeats, powerCV, powerKW });
                    }
                }
                res.status(200).json({ vars });
            } else {
                var versions = await models.Version.findAll({ attributes: ['id', 'description'], where: { modelId: param.patternId } });
                if (versions) {
                    res.status(200).json(versions);
                }
            }
        } else {
            var patters = await models.Pattern.findAll({ attributes: ['id', 'description'], where: { makeId: param.makeId } });
            if (patters) {
                res.status(200).json(patters);
            }
        }
    } else {
        var makes = await models.Make.findAll({ attributes: ['id', 'description'] });
        if (makes) {
            res.status(200).json(makes);
        }
    }
}

async function vars(req,res){
    var params = {
        fuelId: req.body.fuel,
        transmissionId: req.body.transmission,
        bodyId: req.body.body,
        yearId: req.body.year
    }
    var variations = [];
    if(params.fuelId){
        var fuel = await models.Fuel.findAll({attributes: ['id','description'],where:{id:params.fuelId}});
        if(fuel){
            variations.push({"fuel":fuel});
        }
    }
    if(params.transmissionId){
        var transmission = await models.Transmission.findAll({attributes: ['id','description'],where:{id:params.transmissionId}});
        if(transmission){
            variations.push({"transmission":transmission});
        }
    }
    if(params.bodyId){
        var body = await models.Body.findAll({attributes: ['id','description'],where:{id:params.bodyId}});
        if(body){
            variations.push({"body":body});
        }
    }
    if(params.yearId){
        var year = await models.Year.findAll({attributes: ['id','year'],where:{id:params.yearId}});
        if(year){
            variations.push({"year":year});
        }
    }
    res.status(200).json(variations);
}

function show(req, res) {
    const vehicleId = req.params.vehicleId;
    models.Vehicle.findByPk(vehicleId).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
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
    vars: vars,
    show: show
}