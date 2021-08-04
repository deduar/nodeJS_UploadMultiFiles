const { Router } = require('express');
const router = Router();
const fileProcessController= require('../controllers/process');

router.get('/',fileProcessController.index);

module.exports = router;
