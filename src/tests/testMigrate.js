require('../models')
const sequelize = require("../utils/connection");
const user = require('./createData/user');

const testMigrate = async()=>{

    try{
        await sequelize.sync({force:true})
        console.log('DB reset ✅');
        await user()// esto se aNade para que la semilla se pase a la base de datos para el test
        process.exit()
    }catch(error){
        console.error(error);
    }
}


testMigrate()
