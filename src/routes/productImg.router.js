const { getAll, create, remove} = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/multer');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('image') ,create); // para lo de las iamgenes y q sea una sola

routerProductImg.route('/:id')
    .delete(remove)

module.exports = routerProductImg;