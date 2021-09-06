const { Router } = require('express');
const router = Router();
const migrateController= require('../controllers/migrate');

router.get('/',migrateController.index);

module.exports = router;