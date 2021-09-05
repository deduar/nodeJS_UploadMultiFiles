const { Router } = require('express');
const router = Router();
const migrateController= require('../controllers/migrate');

router.get('/',migrateController.index);
router.get('/test',migrateController.test);

module.exports = router;