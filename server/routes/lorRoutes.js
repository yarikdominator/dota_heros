const Router = require('express');
const router = new Router();
const lorController = require('../controllers/lorController');
const checkRole = require('../middleware/checkRole');

router.post('/', checkRole('ADMIN'), lorController.create);
router.get('/', lorController.getAll);
router.delete('/:id', checkRole('ADMIN'), lorController.delete);

module.exports = router;