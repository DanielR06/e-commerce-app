const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models');
const main = async() => {
    try{
        await sequelize.sync({ force: true });
        
        await User.create({
            firstName : 'DanielTest',
            lastName: 'RodriguezTest',
            email: 'danieltest@email.com',
            password: 'danieltest1234',
            phone: '09999999999'
        })

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();