const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
})



const registerUser = asyncHandler(async(req,res) =>{
  const {name,email,password} = req.body;
  const user = await User.findOne({email});
  if(user) {
    res.status(401)
    throw new Error('User with this Email already exists')
  }
  const userdetails = await User.create({
    name,
    email,
    password
  })
  if(userdetails){
    res.status(201).json({
      _id:userdetails._id,
      name:userdetails.name,
      email:userdetails.email,
      isAdmin:userdetails.isAdmin,
      token:generateToken(userdetails._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data')
  }
})


module.exports = {
authUser,
registerUser
}