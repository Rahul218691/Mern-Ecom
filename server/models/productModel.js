const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		trim:true,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	image:{
		type:Object,
		required:true
	}
},{
	timestamps:true
});


module.exports = mongoose.model('Product',productSchema);