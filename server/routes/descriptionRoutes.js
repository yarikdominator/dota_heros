const Router = require('express');
const router = new Router();
const descriptionController = require('../controllers/descriptionController');
const checkRole = require('../middleware/checkRole');

router.post('/', checkRole('ADMIN'), descriptionController.create);
router.get('/',descriptionController.getAll);
router.delete('/:id', checkRole('ADMIN'), descriptionController.delete);

module.exports = router;