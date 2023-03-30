const dbConfig = require('./config/db.config')

const readDB = async (Sequelize,win) => {

    try{

        //create db instance
        const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
            host: dbConfig.HOST,
            dialect: dbConfig.dialect,
            operationsAliases: false,
            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle
            }
        })
        
        //test connection
        await sequelize.authenticate();
        console.log('Connected to db')
    
    } catch(err){
        console.log('Connection to db failed: ',err)
    }

    win.webContents.send('fromMainReadDB','fromDB')
}

module.exports = {readDB}