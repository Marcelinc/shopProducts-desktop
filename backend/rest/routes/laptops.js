const express = require('express')
const router = express.Router()
const {Laptop,Screen,Processor,Disc,Graphic_card,Ram} = require('../../../electron/config/seedDB') 

router.get('/laptops',(req,res) => {
    //res.status(200).json({message:'Success'})
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
        res.status(200).json({data})
    }).catch(err => {
        console.log(err)
        res.status(500).json({message: 'Fetching data failed'})
    })
})

module.exports = router