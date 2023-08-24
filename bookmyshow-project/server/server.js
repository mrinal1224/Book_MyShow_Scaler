const express= require('express')

const app = express()
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const userRoute = require('./routes/userRoute')

app.use(express.json())
app.use('/api/users' , userRoute)




app.listen(8082 , ()=>{
    console.log('Server is Running')
})