const dbConfig = require("./config/db.config");
const { Laptop, Screen, Processor, Ram, Disc, Graphic_card } = require("./config/seedDB");


const writeDB = async (Sequelize,data,win) => {
    var response = true
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
        data.map(async product => {
            //console.log('dataid',product[15])
            if(product[15]+''.match(/^[0-9]+$/)){
                //row has id
                const laptop = await Laptop.findByPk(product[15],{
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
                })

                if(laptop === null){
                    //product not found
                    response = false
                }else{
                    //set new values
                    laptop.set({
                        manufacturer: product[0],
                        os: product[13],
                        disc_reader: product[14],
                    })
                    const screen = await laptop.getScreen()
                    //console.log('touch---------------: ',product[4])
                    screen.set({touch: product[4].toUpperCase() === 'YES' ? true : false,resolution: product[2], size: product[1], type: product[3]})
                    screen.save().then(res => /*console.log(res)*/null).catch(err => console.log(err))

                    const processor = await laptop.getProcessor()
                    processor.set({name: product[5],physical_cores: product[6],clock_speed: product[7]})
                    processor.save().then(res => /*console.log(res)*/null).catch(err => console.log(err))

                    const ram = await laptop.getRam()
                    ram.set({capacity: product[8]})
                    ram.save().then(res=> /*console.log(res)*/null).catch(err => console.log(err))

                    const graphic = await laptop.getGraphic_card()
                    graphic.set({name: product[11], memory: product[12]})
                    graphic.save().then(res => /*console.log(res)*/null).catch(err => console.log(err))

                    const disc = await laptop.getDisc()
                    disc.set({type: product[10], storage: product[9]})
                    disc.save().then(res => /*console.log(res)*/null).catch(err => console.log(err))


                    // and save in db
                    laptop.save().then(res => {
                        null//console.log(res)
                    }).catch(err => {
                        console.log(err)
                        response = false
                    })
                }                
            } else{
                //row doesn't contain an id - create new record
                const newScreen = await Screen.create({touch: product[4].toUpperCase() === 'YES' ? true : false,resolution: product[2], size: product[1], type: product[3]})
                //console.log('newScreen:',newScreen.id)
                const newProcessor = await Processor.create({name: product[5],physical_cores: product[6],clock_speed: product[7]})
                const newRam = await Ram.create({capacity: product[8]})
                const newGraphic = await Graphic_card.create({name: product[11], memory: product[12]})
                const newDisc = await Disc.create({type: product[10], storage: product[9]})

                if(newScreen && newProcessor && newRam && newGraphic && newDisc){
                    Laptop.create({
                        manufacturer: product[0],
                        os: product[13],
                        disc_reader: product[14],
                        screenId: newScreen.id,
                        processorId: newProcessor.id,
                        ramId: newRam.id,
                        discId: newDisc.id,
                        graphicId: newGraphic.id
                    }).then(res => {
                        if(res === null)
                            response = false
                    }).catch(err => {response = false})
                }
            }
        })
        
        
     });

    win.webContents.send('fromMainWriteDB',response)
}

module.exports = {writeDB}