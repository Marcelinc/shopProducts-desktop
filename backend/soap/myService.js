const dbConfig = require("../../electron/config/db.config");
const Sequelize = require('sequelize');
const {Laptop,Screen,Processor,Ram,Disc,Graphic_card} = require('../../electron/config/seedDB');

const myService = {
    MyService: {
        MyPort: {
            MyFunction:async function(args) {
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
                    const data2 = await Laptop.findAndCountAll({
                        where: {
                            manufacturer: args.manufacturer,
                        }
                    }).then(data => {
                        console.log('countr => ', data.count);
                        return{
                            name: data.count
                        }
                    })
                    return {
                        name: data2.name
                    }
                } catch(err) {
                    console.log('err => ', err);
                    return {
                        name: -1
                    }
                }
            },
            //get laptop list by matrixType
            getLaptopListByMatrixType: async function(args) {
                console.log('args => ', args);
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

                    //find all laptops by matrixType
                    const data2 = await Laptop.findAll({
                        raw: true,
                        attributes: ['id','manufacturer','os','disc_reader'],
                        include: [{
                            model: Screen,
                            attributes: {exclude: ['createdAt','updatedAt']},
                            where: {
                                type: args.matrixType,
                            },
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
                    }).then(data => {
                        console.log('countr => ', data);
                        return{
                            name: data
                        }
                    })

                    return {
                        name: data2.name
                    }
                } catch(err) {
                    console.log('err => ', err);
                    return {
                        name: -1
                    }
                }
            },

            //get laptop count by resolution
            getLaptopCountByResolution: async function(args) {
                console.log('args => ', args);
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

                    const data2 = await Laptop.findAndCountAll({
                        attributes: ['id'],
                        include: [{
                            model: Screen,
                            attributes: {exclude: ['createdAt','updatedAt']},
                            where: {
                                resolution: args.resolution,
                            },
                        }]
                    }).then(data => {
                        console.log('countr => ', data.count);
                        return{
                            name: data.count
                        }
                    })

                    return {
                        name: data2.name
                    }

                } catch(err) {
                    console.log('err => ', err);
                     return {
                        name: -1
                    }
                }
            }
        }
    }
}

module.exports = myService;