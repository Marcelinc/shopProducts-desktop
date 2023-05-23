const express = require('express')
const { getAllLaptops, updateLaptop } = require('../controllers/laptopController')
const router = express.Router()

router.get('/laptops',getAllLaptops)
router.put('/laptops/update',updateLaptop)

module.exports = router