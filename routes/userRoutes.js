const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getUser,
  loginUser,
  registerUser,
  tokenValid
} = require('../controllers/userController');

router.route('/').get(auth, getUser);
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/tokenIsValid').post(tokenValid);
// router.route('/update').patch(auth, updateUser);

module.exports = router;
