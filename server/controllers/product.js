const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const createProduct = asyncHandler(async(req,res) =>{
	const {title,price,description,image} = req.body;
	if(!image){
		res.status(401)
	    throw new Error('Please choose an image for the product')
	}
	if(!title){
		res.status(401)
   	    throw new Error('Product name is required')
	}
	if(!price){
		res.status(401)
	    throw new Error('Product price is required')	
	}
	if(!description){
		res.status(401)
    	throw new Error('Product description is required')
	}
	const newProduct = new Product({
		title,
		price,
		description,
		image
	});
	await newProduct.save();
	res.json({message:'New Product created successfully'})
})


const getAllProducts = asyncHandler(async(req,res) =>{
	const products = await Product.find({});
	res.json(products);
})

const fetchallproducts = asyncHandler(async(req,res) =>{
	const products = await Product.find({});
	res.json(products);
})

const deleteProduct = asyncHandler(async(req,res)=>{
	const {id} = req.params;
	await Product.findByIdAndDelete(id);
	res.json({message:'Product deleted'})
})

const getEditProduct = asyncHandler(async(req,res) =>{
	const {id} = req.params;
	const product = await Product.findById(id);
	if(!product){
		res.status(401)
		throw new Error('Product not found')
	}else{
		res.json(product)
	}
})

const updateProduct = asyncHandler(async(req,res) =>{
	const {id} = req.params;
	const {title,price,description} = req.body;
	// console.log(req.body)
	const product = await Product.findById(id);
	if(!product){
		res.status(401)
		throw new Error('Product not found')
	}else{
		product.title = title
		product.price = price
		product.description = description
		await product.save();
		res.json({message:'Product updated'})		
	}
})

const getProductById = asyncHandler(async(req,res) =>{
	const {id} = req.params;
	const product = await Product.findById(id);
	if(!product){
		res.status(400)
		throw new Error('Product not found')
	}
	res.json(product)
})

module.exports ={
createProduct,
getAllProducts,
fetchallproducts,
deleteProduct,
getEditProduct,
updateProduct,
getProductById
}