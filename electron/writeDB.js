const dbConfig = require("./config/db.config")


const writeDB = async (Sequelize,data,win) => {
    console.log(data)

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
     await sequelize.authenticate().then(() => {
        console.log('Connected to db')
     });

    win.webContents.send('fromMainWriteDB',true)
}

module.exports = {writeDB}