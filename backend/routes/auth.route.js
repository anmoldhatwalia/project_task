const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware')
const ctrl= require('../controllers/auth.controller');
const User = require('../models/user.model');

router.post("/signup",ctrl.signUp);
router.post("/login",ctrl.login);

router.get(
  '/profile',
  authMiddleware,
  async (req, res) => {

    const user = await User.findById(
      req.user.id
    ).select('-password');

    res.json(user);

  }
);

router.post('/forgot-password',ctrl.forgotPassword);

router.post('/reset-password/:token',ctrl.resetPassword);

module.exports = router;   