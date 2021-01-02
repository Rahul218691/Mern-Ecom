const router = require('express').Router();
const {
createProduct,
getAllProducts,
fetchallproducts,
deleteProduct,
getEditProduct,
updateProduct,
getProductById
} = require('../controllers/product');
const {protect,admin} = require('../middleware/authMiddleware')

router.post('/addproduct',protect,admin,createProduct);

router.get('/adminproducts',protect,admin,getAllProducts);

router.get('/allproducts',fetchallproducts);

router.delete('/:id',protect,admin,deleteProduct);

router.get('/:id',protect,admin,getEditProduct);

router.post('/:id',protect,admin,updateProduct);

router.get('/details/:id',getProductById);

module.exports = router;