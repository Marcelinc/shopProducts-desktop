const {Laptop,Screen,Processor,Disc,Graphic_card,Ram} = require('../../../electron/config/seedDB') 

const getAllLaptops = async (req,res) => {
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
    }).then(data => {
        //console.log('db: ',res)
        res.status(200).json({message:'Success',data})
    }).catch(err => {
        console.log(err)
        res.status(500).json({message: 'Fetching data failed'})
    })
}

const updateLaptop = (req, res) => {
    var {modified} = req.body
    console.log(modified)
    if(modified && modified.length > 0){
        //save changes
        try{
            modified.map(async product => {
                if(product[15]+''.match(/^[0-9]+$/)){           //row has id
                    if(product.includes('modified')){ 
                        //check if exists id db
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
                            res.status(400).json({message:'Laptop not found',})
                        }else{
                            //set new values
                            laptop.set({
                                manufacturer: product[0],
                                os: product[13],
                                disc_reader: product[14],
                            })
                            const screen = await laptop.getScreen()
                            console.log('touch---------------: ',product[4])
                            screen.set({touch: product[4].toUpperCase() === 'TAK' ? 1 : 0,resolution: product[2], size: product[1], type: product[3]})
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
                                null
                            }).catch(err => {
                                console.log(err)
                            })
                        }                
                    }
                } 
            })
            res.status(200).json(true)
        }catch(err){
            res.status(500).json({message:'Nie udalo sie zapisac zmian'})
        }
        
    } else res.status(400).json({message: 'Brak danych do zapisania'})
}

module.exports = {
    getAllLaptops,
    updateLaptop
}