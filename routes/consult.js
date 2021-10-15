const { Router } = require('express');
const router = Router();
const consultController= require('../controllers/consult');

router.get('/',consultController.index);
router.get('/v2',consultController.index_v2);

router.post('/',consultController.consult);
router.post('/v2',consultController.consult_v2);

router.post('/vars',consultController.vars);

router.get('/:vehicleId',consultController.show);

module.exports = router;