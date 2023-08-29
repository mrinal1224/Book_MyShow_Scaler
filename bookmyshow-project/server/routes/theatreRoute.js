const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
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




module.exports = router;