const { Router } = require('express');
const router = Router();
const postController= require('../controllers/post');

router.get('/',postController.index);
router.get('/:id', postController.show);
router.post('/', postController.save);
router.patch('/:id', postController.update);
router.delete('/:id', postController.destroy);


module.exports = router;