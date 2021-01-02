const router = require('express').Router();
const {
authUser,
registerUser,
} = require('../controllers/auth');

const {protect,admin} = require('../middleware/authMiddleware')

router.post('/login',authUser);

router.post('/register',registerUser);

// router.post('/userlogin',authCustomer);

module.exports = router;