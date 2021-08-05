const { Router } = require('express');
const router = Router();
const vehicleController= require('../controllers/vehicle');

router.get('/',vehicleController.index);
router.get('/:id', vehicleController.show);

module.exports = router;