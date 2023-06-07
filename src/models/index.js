const Product = require('./Product');
const Category = require('./Category');
const ProductImg = require('./ProductImg');

Category.hasMany(Product);
Product.belongsTo(Category); 

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);