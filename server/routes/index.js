const Router = require('express');
const router = new Router();
const descriptionRouter = require('./descriptionRoutes');
const heroRouter = require('./heroRoutes');
const lorRouter = require('./lorRoutes');
const nameRouter = require('./nameRoutes');
const userRouter = require('./userRoutes');

router.use('/user',userRouter);
router.use('/description', descriptionRouter);
router.use('/hero', heroRouter);
router.use('/lor',lorRouter);
router.use('/name',nameRouter);



module.exports = router;