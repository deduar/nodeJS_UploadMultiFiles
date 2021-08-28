const { Router } = require('express');
const router = Router();
const consultController= require('../controllers/consult');

router.get('/',consultController.index);
router.post('/',consultController.consult);
router.post('/vars',consultController.vars);

router.get('/:vehicleId',consultController.show);

module.exports = router;