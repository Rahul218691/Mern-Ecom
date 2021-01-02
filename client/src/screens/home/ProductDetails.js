import React,{useEffect,useState} from 'react';
import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {listProductDetails} from '../../actions/productActions';


const ProductDetails = ({match,history}) =>{

	const dispatch = useDispatch();

	const [qty,setQty] = useState(1);

	const detailedProduct = useSelector((state)=>state.detailedProduct)
	const {loading,error,product} = detailedProduct;

	useEffect(() =>{
		dispatch(listProductDetails(match.params.id))
	},[match,dispatch]);

	const addToCartHandler = () =>{
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	return(
		<>
			<div>
				<Navbar />
			</div>	
			<div className="container">
				{
					loading ? (
						<Loader />
					) : error ? (
						<Message>{error}</Message>
					) :(
						<div className="row mb-2">
							<div className="col-md-6">
								<img src={product.image.url} alt="" className="img-fluid"/>
							</div>
							<div className="col-md-6">
								<h3>{product.title}</h3>
								<hr />
								<h4>Price: &#8377;{product.price}</h4>
								<hr />
								<h6 className="text-justify"><b>Description:</b> {product.description}</h6>
								<hr />
								<div className="flex">
									<span>Quantity: </span>
									<select name="qty" id="qty" value={qty} onChange={(e)=>setQty(e.target.value)}>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>	
								</div>
								<hr />
								<div className="mb-2">
									<button className="btn btn-dark" type="button" onClick={addToCartHandler}>Add To Cart</button>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</>
		)
}

export default ProductDetails;