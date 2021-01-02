const router = require('express').Router();
const {protect,admin} = require('../middleware/authMiddleware');
const {
addOrderItems,
getOrderById,
getMyOrders,
getOrders,
updateOrderToPaid,
updateOrderToDelivered
} = require('../controllers/order');

router
.route('/')
.post(protect,addOrderItems)
.get(protect,admin,getOrders)

router.route('/myorders').get(protect,getMyOrders)

router.route('/:id')
.get(protect,getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

module.exports = router;