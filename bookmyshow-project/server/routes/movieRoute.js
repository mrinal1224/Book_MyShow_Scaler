const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
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

  // update a movie
router.post("/update-movie", authMiddleware, async (req, res) => {
    try {
      await Movie.findByIdAndUpdate(req.body.movieId, req.body);
      res.send({
        success: true,
        message: "Movie updated successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  // // delete a movie
router.post("/delete-movie", authMiddleware, async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.body.movieId);
      res.send({
        success: true,
        message: "Movie deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });
 // get a movie by id
  router.get("/get-movie-by-id/:id", async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send({
        success: true,
        message: "Movie fetched successfully",
        data: movie,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });





module.exports = router;


