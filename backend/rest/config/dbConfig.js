const {Sequelize} = require('sequelize')

const dbConfig = { HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'intsys',
    dialect: 'mysql', 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

const connectDB = async () => {
    try{
        const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch(err) {
        console.log('Nie udało połączyć się z bazą danych: ',err)
    }
}

module.exports = connectDB
