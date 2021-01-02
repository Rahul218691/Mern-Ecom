import React,{useEffect,useState} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios';
import {createProduct} from '../../actions/productActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {PRODUCT_RESET} from '../../constants/productConstants';

const CreateProduct = ({location,history}) =>{

  const dispatch = useDispatch();	

  const [title,setTitle] = useState('');
  const [price,setPrice] = useState('');
  const [description,setDescription] = useState('');
  const [image,setImage] = useState(false);		

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const createdProduct = useSelector((state) => state.createdProduct)
  const { loading,error,message } = createdProduct;  

	useEffect(()=>{
		if(!userInfo && !userInfo.isAdmin){
			history.push('/admin/login')
		}
	},[history,userInfo]);

	const handleUpload = async e =>{
		e.preventDefault();
		try {
			const file = e.target.files[0];

			if(!file){
				return alert('Please choose a image');
			}

			if(file.size > 1024 * 1024){
				return alert('File size too large');
			}

			if(file.type !== 'image/jpeg' && file.type !=='image/png'){
				return alert('File format incorrect')
			}

			let formData = new FormData();
			formData.append('file',file);
			const res = await axios.post('/v1/api/images/upload',formData,{
				headers:{
					"Content-Type":"multipart/form-data",
					Authorization: `Bearer ${userInfo.token}`
				}
			});
			setImage(res.data);
		} catch(error) {
			alert(error.response.data.message)
		}
	}

	const handleSubmit = (e) =>{
		e.preventDefault();
		dispatch(createProduct(title,price,description,image));
		setTitle('');
		setDescription('');
		setImage(false);
		setPrice('');
	}

	const handlePrice = e =>{
		e.preventDefault();
		const re = /^[0-9\b]+$/;
		if(e.target.value === '' || re.test(e.target.value)){
			setPrice(e.target.value)
		}
	}

	if(error || message){
	  	setTimeout(()=>dispatch({
	  		type:PRODUCT_RESET
	  	}),2000);
	}

	const imagedata = () =>{
		return (
				<div className="row">
					<div className="col-md-6"><img src={image.url} alt="" className="img-fluid"/></div>
					<div className="col-md-6"><button className="btn btn-danger" onClick={handleDestroy}><i className="fa fa-trash"></i></button></div>
				</div>	
			)
	}

	const handleDestroy = async (e) =>{
		e.preventDefault();
		try {
			await axios.post('/v1/api/images/destroy',{
				public_id:image.public_id
			},{
				headers:{
					Authorization: `Bearer ${userInfo.token}`
				}
			})
			setImage(false);
		} catch(err) {
			alert(err.response.data.message)
		}
	}

	return(
			<>
				<Sidebar>
					<div className="container">
					<h3 className="text-center">Create Product</h3>
					{message && <Message>{message}</Message>}
					{error && <Message>{error}</Message>}
					{loading && <Loader />}
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="title">Product Title</label>
								<input type="text" autoFocus
								placeholder="product title"
								className="form-control" id="title"
								value={title}
								onChange={(e)=>setTitle(e.target.value)}/>
							</div>
							<div className="form-group">
								<label htmlFor="price">Price</label>
								<input type="text" className="form-control"
								placeholder="product price" id="price"
								value={price}
								onChange={handlePrice}/>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea name="description" id="description" 
								placeholder="product description"
								className="form-control"
								value={description}
								onChange={(e)=>setDescription(e.target.value)}></textarea>
							</div>
							<div className="form-group">
								<label htmlFor="productImage">ProductImage</label>
								<input type="file" id="productImage"
								className="form-control"
								onChange={handleUpload}
								accept="image/*"/>
							</div>
							{image && imagedata()}
							<div>
								<button className="btn btn-warning mt-2" type="submit" disabled={!image}>Create Product</button>
							</div>	
						</form>
					</div>
				</Sidebar>	
			</>
		)
}

export default CreateProduct;