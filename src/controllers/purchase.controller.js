const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const purchases = await Purchase.findAll({
        where:{userId},
        include: [
            {
            model:Product,
            include:[ProductImg]
            }
        ]
    })
    return res.json(purchases);
});

const buyCart = catchError(async(req, res) => {
    const userId = req.user.id;
    const cartProducts = await Cart.findAll({
        where: { userId },
        raw:true
    }); 
    const purchases = await Purchase.bulkCreate(cartProducts);
    await Cart.destroy({where:{ userId }})
    return res.json(purchases);
});

module.exports = {
    getAll,
    buyCart
}