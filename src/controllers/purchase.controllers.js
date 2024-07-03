const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Purchase.findAll({where:{userId},
    include:[
        {
            model:Product,
            attributes:['title', 'price'],
            include:[
                {
                    model:Category,
                    attributes:['name']
                },
                {
                    model: ProductImg,
                  }
            ]
        }
    ]// aqui definimos como quiero q venga el recibo
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id

    const cart = await Cart.findAll({
        where:{userId},
        raw: true, // para q venga mas limpio, lo serializa
        attributes:['quantity', 'userId', 'productId']
    })
    if(!cart) return res.status(404)
    const result = await Purchase.bulkCreate(cart);

    await Cart.destroy({where:{userId}})// aqui se borra el registro de Cart

    return res.status(201).json(result);// con esto me traigo lo del carrito
});



module.exports = {
    getAll,
    create
}