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
    res.status(200).json({message: 'Success'})
}

module.exports = {
    getAllLaptops,
    updateLaptop
}