const Router = require('express');
const router = new Router();
const heroController = require('../controllers/heroController');
const checkRole = require('../middleware/checkRole');

router.post('/', checkRole('ADMIN'), heroController.create);
router.get('/', heroController.getAll);
router.get('/:id', heroController.getOne);
router.put('/:id', checkRole('ADMIN'), heroController.update);
router.delete('/:id', checkRole('ADMIN'), heroController.delete);

module.exports = router;