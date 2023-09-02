const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Show = require("../models/showModel");
const Theatre = require('../models/theatreModel')



// add theatre
router.post("/add-theatre", authMiddleware, async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.post("/update-theatre", authMiddleware, async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/delete-theatre", authMiddleware, async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


//get all theatres

router.get("/get-all-theatres", authMiddleware, async (req, res) => {
  try {
    const theatres = await Theatre.find().populate('owner')
    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});



 // get all theatres by owner
 router.post("/get-all-theatres-by-owner", authMiddleware, async (req, res) => {
    try {
      const theatres = await Theatre.find({ owner: req.body.owner })
      res.send({
        success: true,
        message: "Theatres fetched successfully",
        data: theatres,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });



  // add a Show

  router.post("/add-show", authMiddleware, async (req, res) => {
    try {
      const newShow = new Show(req.body);
      await newShow.save();
      res.send({
        success: true,
        message: "Show added successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  // get shows based on theatres

  router.post("/get-all-shows-by-theatre", authMiddleware, async (req, res) => {
    try {
      const shows = await Show.find({ theatre: req.body.theatreId })
        .populate("movie")
        .sort({
          createdAt: -1,
        });
  
      res.send({
        success: true,
        message: "Shows fetched successfully",
        data: shows,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  // delete show
router.post("/delete-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});













module.exports = router;