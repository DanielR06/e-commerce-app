const express = require('express');
const userRouter = require('./user.route');
const router = express.Router();

router.use('/users', userRouter);


module.exports = router;