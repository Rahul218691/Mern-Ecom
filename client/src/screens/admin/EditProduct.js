import React,{useEffect,useState} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {getProduct} from '../../apicalls/api';
import {editProduct} from '../../actions/productActions';
import {EDIT_PRODUCT_RESET} from '../../constants/productConstants';

const EditProduct = ({location,history,match}) =>{	
  const dispatch = useDispatch();
  const [title,setTitle] = useState('');
  const [price,setPrice] = useState('');
  const [description,setDescription] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const productEdit = useSelector((state) => state.productEdit)
  const { loading,message,error } = productEdit;

	useEffect(()=>{
		if(userInfo && userInfo.isAdmin){
			getProduct(match.params.id,userInfo.token)
			.then(data=>{
				if(data.error){
					console.log(data.error)
				}else{
					setTitle(data.title);
					setPrice(data.price);
					setDescription(data.description);
				}
			})			
		}else{
			history.push('/admin/login')
		}
	},[history,userInfo,match]);

	const handleOnSubmit = (e) =>{
		e.preventDefault();
		dispatch(editProduct(match.params.id,title,price,description));
	}

	if(error || message){
	  	setTimeout(()=>dispatch({
	  		type:EDIT_PRODUCT_RESET
	  	}),2000);
	}

	return(
			<>
				<Sidebar>
					<div className="container">
					{loading && <Loader/>}
					{error && <Message>{error}</Message>}
					{message && <Message>{message}</Message>}
						<form onSubmit={handleOnSubmit}>
							<div className="form-group">
								<label htmlFor="title">Product Title</label>
								<input type="text" placeholder="product title"
								id="title"
								className="form-control"
								value={title}
								onChange={(e)=>setTitle(e.target.value)}/>
							</div>
							<div className="form-group">
								<label htmlFor="price">Price</label>
								<input type="text" placeholder="product price"
								className="form-control"
								id="price"
								value={price}
								onChange={(e)=>setPrice(e.target.value)}/>
							</div>
							<div className="form-group">
								<label htmlFor="desc">Description</label>
								<textarea id="desc" className="form-control"
								placeholder="product description"
								value={description}
								onChange={(e)=>setDescription(e.target.value)}></textarea>
							</div>
							<div>
								<button className="btn btn-warning">Edit Product</button>
							</div>	
						</form>
					</div>
				</Sidebar>
			</>
		)
}

export default EditProduct;