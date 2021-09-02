const models = require('../models');


function index(req, res) {
    res.status(200).json({
        message: "OK migrate"
    });
}

module.exports = {
    index: index
}