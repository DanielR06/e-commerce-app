const express = require('express');
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const router = express.Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);


module.exports = router;