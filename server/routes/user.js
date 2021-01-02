const router = require('express').Router();
const {protect} = require('../middleware/authMiddleware');
const {
	getUserProfile,
	updateUserProfile
} = require('../controllers/user');

router
.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile)


module.exports = router;