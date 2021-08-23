const { Router } = require('express');
const router = Router();

router.get('/', (req,res,nex) => {
    res.render('./root/index.ejs');
});

module.exports = router;
