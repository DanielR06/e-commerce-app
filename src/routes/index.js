const express = require('express');
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const productRouter = require('./product.route');
const productImgRouter = require('./productImg.router');
const cartRouter = require('./cart.route');
const purchaseRouter = require('./purchase.route');
const router = express.Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/products_images', productImgRouter);
router.use('/carts', cartRouter);
router.use('/purchases', purchaseRouter);


module.exports = router;