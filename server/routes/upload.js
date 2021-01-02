const router = require('express').Router();
const fs = require('fs');
const cloudinary = require('cloudinary');
const {protect,admin} = require('../middleware/authMiddleware');

cloudinary.config({
	cloud_name:process.env.CLOUD_NAME,
	api_key:process.env.CLOUD_API_KEY,
	api_secret:process.env.CLOUD_API_SECRET
});


router.post('/upload',protect,admin,(req,res) =>{
	try{
		if(!req.files || Object.keys(req.files).length === 0){
		    res.status(401)
		    throw new Error('No Images were selected!')
		}
		const file = req.files.file;
		//console.log(file)
		if(file.size > 1024*1024){
			removeTmp(file.tempFilePath)
			    res.status(401)
    			throw new Error('File size too large')
		}

		cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"milkdiary"},async(err,result)=>{
			if(err) throw err;
			removeTmp(file.tempFilePath)
			res.json({public_id:result.public_id,url:result.secure_url})
		})

	}catch(err){
		return res.status(500).json({message:err.message})
	}
})


router.post('/destroy',(req,res) =>{
	try{
		const {public_id} = req.body;
		if(!public_id){
			res.status(401)
			throw new Error('No Image selected')
		}	
		cloudinary.v2.uploader.destroy(public_id,async(err,result) =>{
			if(err) throw err
			res.json({
				message:'Deleted Image'
			})	
		})
	}catch(err){
		return res.status(500).json({msg:err.message})
	}
})

const removeTmp = (path) =>{
	fs.unlink(path,err=>{
		if(err) throw err
	})
}

module.exports = router;