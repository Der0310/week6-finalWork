require('./User')
const Product = require('./Product')
const Category = require('./Category')
const Cart = require('./Cart')
const User = require('./User')
const Purchase = require('./Purchase')
const ProductImg = require('./ProductImg')

Product.belongsTo(Category)
Category.hasMany(Product)


//Cart-> userId la tabla va primero SIEMPRE
Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase-> userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase-> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//ProductImg---> productId

ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)