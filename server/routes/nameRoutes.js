const Router = require('express');
const router = new Router();
const nameController = require('../controllers/nameController');
const checkRole = require('../middleware/checkRole');

router.post('/', checkRole('ADMIN'), nameController.create);
router.get('/',nameController.getAll);
router.delete('/:id', checkRole('ADMIN'), nameController.delete);



module.exports = router;