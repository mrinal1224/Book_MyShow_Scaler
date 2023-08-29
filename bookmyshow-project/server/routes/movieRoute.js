const router = require('express').Router()
const Movie = require('../models/movieModel')


// Add a new Movie

router.post('/add-movie' , async (req , res)=>{
    try {
        const newMovie = new Movie(req.body)
        await newMovie.save()
        res.send({
            success: true,
            message: "Movie added successfully",
          });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
          });
    }
})

router.get("/get-all-movies", async (req, res) => {
    try {
      const movies = await Movie.find()
      res.send({
        success: true,
        message: "Movies fetched successfully",
        data: movies,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  })




module.exports = router;


