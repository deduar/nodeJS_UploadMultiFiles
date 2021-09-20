const models = require('../models');

function index(req, res) {
    models.vehicle.findAll().then(result => {
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
        makeId: req.body.make,
        patternId: req.body.model,
        versionId: req.body.version
    }

    if (param.makeId) {
        if (param.patternId) {
            if (param.versionId) {
                var variations = await models.variation.findAll({ attributes: ['carId', 'fuelId', 'transmissionId', 'segmentId', 'yearId', 'bodyId', 'numSeat', 'doors', 'powerCV', 'powerKW'], where: { versionId: param.versionId } });
                var vars = [];
                if (variations) {
                    for (const variation of variations) {
                        var segment = await models.segment.findAll({ attributes: ['id', 'description'], where: { id: variation.segmentId } });
                        var fuel = await models.fuel.findAll({ attributes: ['id', 'description'], where: { id: variation.fuelId } });
                        var transmission = await models.transmission.findAll({ attributes: ['id', 'description'], where: { id: variation.transmissionId } });
                        var body = await models.body.findAll({ attributes: ['id', 'description'], where: { id: variation.bodyId } });
                        var year = await models.year.findAll({ attributes: ['id', 'description'], where: { id: variation.yearId } });
                        var numDoors = variation.doors;
                        var numSeats = variation.numSeat;
                        var powerCV = variation.powerCV;
                        var powerKW = variation.powerKW;
                        vars.push({ segment, fuel, transmission, body, year, numDoors, numSeats, powerCV, powerKW });
                    }
                }
                res.status(200).json({ vars });
            } else {
                var versions = await models.version.findAll({ attributes: ['id', 'description'], where: { modelId: param.patternId } });
                if (versions) {
                    res.status(200).json(versions);
                }
            }
        } else {
            var patters = await models.pattern.findAll({ attributes: ['id', 'description'], where: { makeId: param.makeId } });
            if (patters) {
                res.status(200).json(patters);
            }
        }
    } else {
        var makes = await models.make.findAll({ attributes: ['id', 'description'] });
        if (makes) {
            res.status(200).json(makes);
        }
    }
}

async function vars(req, res) {
    var params = {
        versionId: req.body.version,
        fuelId: req.body.fuel,
        transmissionId: req.body.transmission,
        bodyId: req.body.body,
        yearId: req.body.year,
        segmentId: req.body.segment,
        colorId: req.body.color,

        allColors: req.body.colors
    }
    var variations = [];

    // segment & segments
    if (params.segmentId) {
        if (params.segmentId == 0) {
            var segment = await models.segment.findAll({ attributes: ['id', 'description'] });
        } else {
            var segment = await models.segment.findAll({ attributes: ['id', 'description'], where: { id: params.segmentId } });
        }
        variations.push({ segment });
    }

    // fuel & fuels
    if (params.fuelId) {
        if (params.fuelId == 0) {
            var fuel = await models.fuel.findAll({ attributes: ['id', 'description'] });
        } else {
            var fuel = await models.fuel.findAll({ attributes: ['id', 'description'], where: { id: params.fuelId } });
        }
        variations.push({ fuel });
    }

    // transmission & transmissions
    if (params.transmissionId) {
        if (params.transmissionId == 0) {
            var transmission = await models.transmission.findAll({ attributes: ['id', 'description'] });
        } else {
            var transmission = await models.transmission.findAll({ attributes: ['id', 'description'], where: { id: params.transmissionId } });
        }
        variations.push({ transmission });
    }

    // body & bodys
    if (params.bodyId) {
        if (params.bodyId == 0) {
            var body = await models.body.findAll({ attributes: ['id', 'description'] });
        } else {
            var body = await models.body.findAll({ attributes: ['id', 'description'], where: { id: params.bodyId } });
        }
        variations.push({ body });
    }

    // year & years
    if (params.yearId) {
        if (params.bodyId == 0) {
            var year = await models.year.findAll({ attributes: ['id', 'description'] });
        } else {
            var year = await models.year.findAll({ attributes: ['id', 'description'], where: { id: params.yearId } });
        }
        variations.push({ year });
    }

    // color & colors
    if (params.colorId) {
        if (params.colorId == 0) {
            var color = await models.color.findAll({ attributes: ['id', 'description'] });
        } else {
            var color = await models.color.findAll({ attributes: ['id', 'description'], where: { id: params.colorId } });
        }
        variations.push({ color });
    }

    res.status(200).json(variations);
}

function show(req, res) {
    const vehicleId = req.params.vehicleId;
    models.vehicle.findByPk(vehicleId).then(result => {
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