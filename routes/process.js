const { Router } = require('express');
const router = Router();
const fileProcessController= require('../controllers/process');

router.get('/',fileProcessController.index);
router.get('/splitMark',fileProcessController.splitMark);
router.get('/splitModel',fileProcessController.splitModel);
router.get('/splitVersion',fileProcessController.splitVersion);

module.exports = router;
