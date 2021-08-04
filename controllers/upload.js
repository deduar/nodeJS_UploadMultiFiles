var multer  = require('multer');
var fileUpload= require('../middlewares/upload-middleware');
module.exports={
    fileUploadForm:function(req,res){
        res.render('upload/form');
     },
     uploadFile:function(req,res){
        var upload = multer({
                    storage: fileUpload.files.storage(), 
                    allowedFile:fileUpload.files.allowedFile 
                    }).array('vehicle');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           }else{
              res.json({ status: 'OK'});
              //res.render('upload/form');
           } 
        })
     }
}