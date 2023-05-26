const express = require('express')
const { getAllLaptops, updateLaptop, createLaptop, deleteLaptop } = require('../controllers/laptopController')
const router = express.Router()

router.get('/laptops',getAllLaptops)
router.put('/laptops/update',updateLaptop)
router.post('/laptops/create',createLaptop)
router.delete('/laptops/delete/:id',deleteLaptop)

module.exports = router