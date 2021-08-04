const { Router } = require('express');
const router = Router();

router.get('/', (req,res,nex) => {
    res.render('./main/index.ejs');
});

module.exports = router;
