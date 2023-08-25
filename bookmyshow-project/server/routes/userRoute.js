const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


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


    res.send({
        success : true,
        message : 'User Logged in'
    })
})












module.exports = router




