const fs = require('fs');
const models = require('../models');

function index(req, res) {
    var data = fs.readFileSync('./uploads/example.csv', 'utf8');    //File -> data
    data = data.split("\r\n");
    for (var i = 0; i < data.length; i++) {
        line = data[i].split(';');
        var vehicle= {
            carId: line[1],
            make: line[2],
            model: line[3],
            description: line[4],
            segment: line[5],
            vehicleType: line[6],
            bodyStyle: line[7],
            fuelType: line[40],
            transmision: line[42],
            numSeat: line[10],
            powerCV: line[14],
            powerKW: line[16],
            doors: line[9]
        }
        models.Vehicle.create(vehicle);
    }
    res.json({
        message: "OK"
    })
}

module.exports = {
    index: index
}