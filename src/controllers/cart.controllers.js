const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Cart.findAll({
        where:{ userId},
        include:[
            {
                model:Product,
                attributes:{exclude:["createdAt","updatedAt"]},
                //atributes:['title'] asi si es lo q quiero q incluya
                include:[
                    {
                    model:Category,
                    atributes:['name']
                },
                {
                    model: ProductImg,
                  }
            ]
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {quantity, productId} = req.body
    const userId = req.user.id// lineas a;adidas para a;adir al carrito

    const result = await Cart.create({userId, quantity, productId});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id
    const result = await Cart.findByPk(id,{
        where:{ userId},
        include:[
            {
                model:Product,
                attributes:{exclude:["createdAt","updatedAt"]},
                //atributes:['title'] asi si es lo q quiero q incluya
                include:[
                    {
                    model:Category,
                    atributes:['name']
                }
            ]
            }
        ]
    } );
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {

    const { id } = req.params;
    const result = await Cart.destroy({ 
        where: {
            id, 
            userId: req.user.id//requiere al usuario logueado para hacer celiminar
        }});
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const userId = req.user.id// para ver quien puede actualizar
    const { id } = req.params;
    const {quantity} = req.body
    const result = await Cart.update(
        {quantity},// esto para q solo la cantidad se cambie
        { where: {id, userId}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}