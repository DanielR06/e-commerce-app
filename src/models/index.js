const Product = require('./Product');
const Category = require('./Category');

Category.hasMany(Product);
Product.belongsTo(Category); 