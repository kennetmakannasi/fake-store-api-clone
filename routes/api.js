const express = require('express');
const router = express.Router();

const userRouter = require('./api/user');
const productRouter = require('./api/product');
const categoryRouter = require('./api/category');
const cartRouter = require('./api/cart');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);

module.exports = router;
