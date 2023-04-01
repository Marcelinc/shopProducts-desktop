const dbConfig = require('./config/db.config');
const { Laptop, Screen, Processor, Ram, Disc, Graphic_card } = require('./config/seedDB');

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

        //Laptop
        Laptop.findAll({
            raw: true,
            attributes: ['id','manufacturer','os','disc_reader'],
            include: [{
                model: Screen,
                attributes: {exclude: ['createdAt','updatedAt']}
            },{
                model: Processor,
                attributes: {exclude: ['createdAt','updatedAt']}
            },{
                model: Ram,
                attributes: {exclude: ['createdAt','updatedAt']}
            },{
                model: Disc,
                attributes: {exclude: ['createdAt','updatedAt']}
            },{
                model: Graphic_card,
                attributes: {exclude: ['createdAt','updatedAt']}
            }]
        }).then(res => {
            //console.log('db: ',res)
            win.webContents.send('fromMainReadDB',res)
        })
        .catch(err => {
            console.log(err)
        })
    
    } catch(err){
        //console.log('Connection to db failed: ',err)
        console.log('Connection to db failed. ',err)
        win.webContents.send('fromMainReadDB','Pobieranie danych nie powiodło się')
    }

    
}

module.exports = {readDB}