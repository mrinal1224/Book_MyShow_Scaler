const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')


//resgiter a user

router.post('/register', async (req, res) => {
    try {

        const userExists = await User.findOne({ email: req.body.email })

        if (userExists) {
            return res.send({
                success: false,
                message: 'User Alreay Exists'
            })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password , salt)
        req.body.password = hashedPassword

        const newUser = new User(req.body)
        await newUser.save()

        res.send({ success: true, message: "Registration Successfull , Please login" });

    } catch (error) {
        console.log(error)
    }
})


//login Routes

router.post('/login' , async (req , res)=>{
    const user = await User.findOne({email : req.body.email})
   if(!user){
        return res.send({
            success : false,
            message : 'User does not exist'
        })
    }


    const validPassword = await bcrypt.compare(req.body.password , user.password)
     
    if(!validPassword){
        return res.send({
            success : false,
            message : 'Invalid Password'
        })
    }


    const token = jwt.sign({userId : user._id} , process.env.jwt_secret , {expiresIn :"1d"})

    console.log(token)


   res.send({
        success : true,
        message : 'User Logged in',
        data : token
    })
})

// Get user details by id (Protected Route)

router.get('/get-current-user',authMiddleware, async (req , res)=>{
    try {
        const user = await User.findById(req.body.userId).select('-password')

        res.send({
            success : true,
            message : 'User details fetched Successfully',
            data : user
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
          });
    }
})


















module.exports = router




