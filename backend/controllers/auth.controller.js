const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const sendEmail = require('../utils/sendEmail');

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'User Exists' })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashPassword
    });

    res.status(201).json(user);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "Not Found" })
    }

    const match = await bcrypt.compare(password,user.password)

    if (!match) {
        return res.status(401).json({ message: "Worng Password" })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.json({token});  
}



exports.forgotPassword =
async (req,res)=>{

 try{

  const { email } = req.body;

  const user =
  await User.findOne({ email });

  if(!user){

    return res.status(404)
    .json({
      message:'User not found'
    });

  }

  const token =
  crypto.randomBytes(32)
  .toString('hex');

  user.resetToken = token;

  user.resetTokenExpiry =
  Date.now() + 3600000;

  await user.save();

  const resetLink =

  `http://localhost:4200/reset-password/${token}`;

  await sendEmail(

    user.email,

    'Reset Password',

    `
      <h2>Reset Password</h2>

      <p>
        Click below link
      </p>

      <a href="${resetLink}">
        Reset Password
      </a>
    `
  );

  res.json({

    message:
    'Reset Link Sent'

  });

 }catch(error){

  res.status(500).json({
    message:error.message
  });

 }

};

exports.resetPassword =
async (req,res)=>{

 try{

  const { token } =
  req.params;

  const { password } =
  req.body;

  const user =
  await User.findOne({

    resetToken: token,

    resetTokenExpiry: {
      $gt: Date.now()
    }

  });

  if(!user){

    return res.status(400)
    .json({

      message:
      'Invalid or Expired Token'

    });

  }

  const hashPassword =
  await bcrypt.hash(
    password,
    10
  );

  user.password =
  hashPassword;

  user.resetToken =
  undefined;

  user.resetTokenExpiry =
  undefined;

  await user.save();

  res.json({

    message:
    'Password Reset Successful'

  });

 }catch(error){

  res.status(500).json({
    message:error.message
  });

 }

};
