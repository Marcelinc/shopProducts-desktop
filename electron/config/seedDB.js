const { DataTypes, Sequelize } = require("sequelize");
const dbConfig = require("./db.config");


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

//define models
const Screen = sequelize.define('Screen',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    touch: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    resolution: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    }
})
const Processor = sequelize.define('Processor',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    physical_cores: {
        type: DataTypes.INTEGER
    },
    clock_speed: {
        type: DataTypes.INTEGER
    }
})
const Ram = sequelize.define('Ram',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    capacity: {
        type: DataTypes.STRING
    }
})
const Disc = sequelize.define('Disc',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING
    },
    storage: {
        type: DataTypes.STRING
    }
})
const Graphic_card = sequelize.define('Graphic_card',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    memory: {
        type: DataTypes.STRING
    }
})
const Laptop = sequelize.define('Laptop',{
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    os: {
        type: DataTypes.STRING
    },
    disc_reader: {
        type: DataTypes.STRING
    },
    /*fullData: {
        type: DataTypes.VIRTUAL,
        get(){
            return
        }
    }*/
})
//Make associations
    Laptop.belongsTo(Screen,{foreignKey: 'screenId', onUpdate: 'CASCADE'})
    Laptop.belongsTo(Processor, {foreignKey: 'processorId'})
    Laptop.belongsTo(Ram, {foreignKey: 'ramId'})
    Laptop.belongsTo(Disc, {foreignKey: 'discId'})
    Laptop.belongsTo(Graphic_card, {foreignKey: 'graphicId'})



const seedDB = () => {

    //connect to db
    sequelize.authenticate().then(async () => {
        //synchronize with db (create table if not exists)
        Screen.sync({alter: true})
        Processor.sync({alter: true})
        Laptop.sync({alter: true})
        Ram.sync({alter: true})
        Disc.sync({alter: true})
        Graphic_card.sync({alter: true})


        //add data
        const screen1 = await Screen.create({touch: false,resolution: '1600x900',size: '12"',type: 'matowy'})
        const screen2 = await Screen.create({touch: false,resolution: '1400x800',size: '10"',type: 'matowy'})
        
        const processor1 = await Processor.create({name: 'amd ryzen 5 3600', physical_cores: 6,clock_speed: 3600})
        const processor2 = await Processor.create({name: 'i7', physical_cores: 8, clock_speed: 3200})

        const ram1 = await Ram.create({capacity: '16GB'})
        const ram2 = await Ram.create({capacity: '8GB'})

        const disc1 = await Disc.create({type: 'SSD',storage: '500GB'})
        const disc2 = await Disc.create({type: 'SSD', storage: '240GB'})

        const graphic1 = await Graphic_card.create({name: 'GeForce RTX 3060',memory: '12GB'})
        const graphic2 = await Graphic_card.create({name: 'intel HD Graphics 4000',memory: '1GB'})

        const laptop1 = await Laptop.create({
            id:1,
            manufacturer: 'HP',
            os: 'Windows 10',
            disc_reader: 'brak',
            screenId: 1,
            processorId: 1,
            ramId: 1,
            discId: 1,
            graphicId: 1
        }).then(res => null)
        .catch(err => console.log('error inserting'))

        const laptop2 = await Laptop.create({
            id:2,
            manufacturer: 'HP',
            os: 'Windows 11',
            disc_reader: 'Blu-Ray',
            screenId: 2,
            processorId: 2,
            ramId: 2,
            discId: 2,
            graphicId: 2
        }).then(res => null)
        .catch(err => /*console.log(err)*/null)       

        //close connection
        //sequelize.close()
    }).catch(err => {
        console.log(err)
    })


}

module.exports = {seedDB,Laptop,Screen,Processor,Ram,Disc,Graphic_card}
