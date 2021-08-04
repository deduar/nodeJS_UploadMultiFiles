const { Router } = require('express');
const router = Router();
const fileUploadController= require('../controllers/upload');

router.get('/',fileUploadController.fileUploadForm);
router.post('/',fileUploadController.uploadFile);

module.exports = router;
