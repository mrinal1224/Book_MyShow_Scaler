const express= require('express')
var cors = require('cors');


const app = express()
app.use(cors());
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const userRoute = require('./routes/userRoute')
const movieRoute = require('./routes/movieRoute')
const theatreRoute = require('./routes/theatreRoute')
const upcomingRoute = require('./routes/upcomingRoute')

app.use(express.json())
app.use('/api/users' , userRoute)
app.use('/api/movies' , movieRoute)
app.use('/api/theatres' , theatreRoute)
app.use("/api/upcoming", upcomingRoute);




app.listen(8082 , ()=>{
    console.log('Server is Running')
})