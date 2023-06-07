const Product = require('./Product');
const Category = require('./Category');
const ProductImg = require('./ProductImg');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Purchase = require('../models/Purchase');

Category.hasMany(Product);
Product.belongsTo(Category); 

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);
User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);
User.hasMany(Purchase);
Purchase.belongsTo(User);