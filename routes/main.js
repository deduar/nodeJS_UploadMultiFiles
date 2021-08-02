const { Router } = require('express');
const formController = require('../controllers/form');
const router = Router();

router.get('/', (req,res,nex) => {
    res.render('./main/index.ejs');
});

router.get('/form', (req,res,nex) => {
    res.render('./main/form.ejs');
});

router.post('/form', formController.process);

module.exports = router;
