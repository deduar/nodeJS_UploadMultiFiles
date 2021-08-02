const { response } = require('express');
const Validator = require('express-validator');

// Process form
function process(req,res,next){
    res.render('main/form_out', {
        data: req.body, // { message, email }
        errors: {
          message: {
            msg: 'A message is required'
          },
          email: {
            msg: 'That email doesn‘t look right'
          }
        }
      });
}

module.exports = {
    process: process
}