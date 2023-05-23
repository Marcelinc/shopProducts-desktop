const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbConfig')
const app = express()

const PORT = 5001

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api',require('./routes/laptops'));

connectDB()

app.listen(PORT,() => console.log('REST server running on port '+PORT))