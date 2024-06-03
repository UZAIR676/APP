import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js';
import createToken from '../utils/createToken.js'; // Assuming this is your token generation utility

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email, and password' });
  }
  // Check if user already exists
 
   const userExits = await User.findOne({email})
   if (userExits) res.status(400).send("user already exits");
   const salt = await bcrypt.genSalt(10);
  // Hash the password
  const hashedPassword = await bcrypt.hash(password,salt)
  // Create a new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
        _id : newUser._id,
        username : newUser.username,
        email : newUser.email,
        isAdmin : newUser.isAdmin,
    })
    
  } catch (error) {
    res.status(400)
    throw new Error("inavalid user data")
    
  }

});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const existingUser = await User.findOne({email})
    console.log(existingUser)
  if (existingUser){
    const isPasswordValid = await bcrypt.compare(password,existingUser.password)

    if (isPasswordValid){
      createToken(res,existingUser._id)

      res.status(201).json({
        _id : existingUser._id,
        username : existingUser.username,
        email : existingUser.email,
        isAdmin :  existingUser.isAdmin,
    })
    }
    else{
        res.status(401).json({message:"Invalid Password"})
    }

  }
  else{
    res.status(401).json({message: "user not found "})
    
  }
})

const logoutCurrentUser = asyncHandler(async(req,res)=>{
  res.cookie('jwt','',{
    http : true,
    expires : new Date(0)

  })
  res.status(200).json({message:"logged out successfully"})
})
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getcurrentUser = asyncHandler(async(req,res)=>{
const user =   await User.findById(req.user._id)
console.log(user)
})

export { createUser ,loginUser, logoutCurrentUser ,getAllUsers,getcurrentUser};
