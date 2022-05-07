const router = require('express').Router();

const { signupUser, loginUser } = require('../controllers/user')

//user routes....auth...

router.route('/signup').post(signupUser)



router.route('/login').post(loginUser)



module.exports = router;