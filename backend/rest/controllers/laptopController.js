const {Laptop,Screen,Processor,Disc,Graphic_card,Ram} = require('../../../electron/config/seedDB') 

// @desc    Get laptops
// @route   GET /api/laptops
// @access  public
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

// @desc    Update laptop
// @router  PUT /api/laptops/update
// @access  public
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

// @desc    Create a new laptop
// @route   /api/laptops/create
// @access  public
const createLaptop = async (req,res) => {
    console.log(req.body.laptop)
    const {laptop} = req.body
    if(laptop && laptop.producer !== undefined && laptop.producer !== ''){
        const newScreen = await Screen.create({touch: laptop.screenTouch.toUpperCase() === 'TAK' ? true : false,resolution: laptop.resolution,
        size: laptop.screenSize, type: laptop.screenType})
        //console.log('newScreen:',newScreen.id)
        const newProcessor = await Processor.create({name: laptop.processor,physical_cores: laptop.processorCors,clock_speed: laptop.processorClockSpeed})
        const newRam = await Ram.create({capacity: laptop.ram})
        const newGraphic = await Graphic_card.create({name: laptop.graphicCard, memory: laptop.graphicCardMemory})
        const newDisc = await Disc.create({type: laptop.discType, storage: laptop.discStorage})
        
        if(newScreen && newProcessor && newRam && newGraphic && newDisc){
            Laptop.create({
                manufacturer: laptop.producer,
                os: laptop.os,
                disc_reader: laptop.discReader,
                screenId: newScreen.id,
                processorId: newProcessor.id,
                ramId: newRam.id,
                discId: newDisc.id,
                graphicId: newGraphic.id
            }).then(response => {
                console.log(response.dataValues)
                if(response === null)
                    res.status(500).json({message: 'Błąd zapisu'})
                else res.status(200).json({message:'Zapisano', laptopId: response.dataValues.id})
            }).catch(err => {
                console.log(err)
                res.status(500).json({message: 'Błąd podczas zapisu'})
            })
        }
    } else res.status(400).json({message: 'Niepoprawne żądanie'})
    
} 

module.exports = {
    getAllLaptops,
    updateLaptop,
    createLaptop,
}