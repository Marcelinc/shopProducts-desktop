const express = require('express')
const { getAllLaptops, updateLaptop, createLaptop } = require('../controllers/laptopController')
const router = express.Router()

router.get('/laptops',getAllLaptops)
router.put('/laptops/update',updateLaptop)
router.post('/laptops/create',createLaptop)

module.exports = router