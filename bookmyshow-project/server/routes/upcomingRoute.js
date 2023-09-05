const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Upcoming = require("../models/upcomingModel");


router.post("/add-upcoming-movie", authMiddleware, async (req, res) => {
    try {
      const newMovie = new Upcoming(req.body);
      await newMovie.save();
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
  });


  // get all movies
router.get("/get-all-upcoming-movies", async (req, res) => {
    try {
      const movies = await Upcoming.find().sort({ createdAt: -1 });
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
  });
  
  // update a movie
  router.post("/update-upcoming-movie", authMiddleware, async (req, res) => {
    try {
      await Upcoming.findByIdAndUpdate(req.body.movieId, req.body);
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
  router.post("/delete-upcoming-movie", authMiddleware, async (req, res) => {
    try {
      await Upcoming.findByIdAndDelete(req.body.movieId);
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

  module.exports = router;
