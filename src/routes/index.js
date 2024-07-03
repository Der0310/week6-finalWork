const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const { verifyJWT } = require('../utils/verifyJWT');
const routerProductImg = require('./productImg.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/cart', routerCart)
router.use('/purchase', verifyJWT, routerPurchase)// si todas son protegidas puedo proteger desde aqui❗❗❗
router.use('/product_images', verifyJWT, routerProductImg)


module.exports = router;