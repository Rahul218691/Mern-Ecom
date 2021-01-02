import React,{useEffect} from 'react';
import Navbar from '../../components/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import Message from '../../components/Message';
import {Link} from 'react-router-dom';
import {addToCart,removeFromCart} from '../../actions/cartActions';

const CartScreen = ({match,history,location}) =>{

	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1
	const dispatch = useDispatch();

	const cart = useSelector((state)=>state.cart)
	const { cartItems } = cart	

	const removeFromCartHandler = (id) => {
	    dispatch(removeFromCart(id))
	}

	const checkoutHandler = () =>{
		history.push('/user/login?redirect=shipping')
	}


	useEffect(() =>{
		if(productId){
			dispatch(addToCart(productId,qty))
		}
	},[dispatch,productId,qty])

	return(
			<>
				<div>
					<Navbar />
				</div>
				<div className="container">
				<div className="row">
					<div className="col-md-8">
						<h1>Shopping Cart</h1>
						{
							cartItems.length === 0 ? (
									<Message>
										Your cart is empty <Link to='/'>Go Back</Link>
									</Message>
								):(
									<>
										{
											cartItems.map((item) =>(
													<div key={item.product} className="mb-2">
														<div className="row">
															<div className="col-md-2">
																<img src={item.image} alt="" className="img-fluid rounded"/>
															</div>
															<div className="col-md-3">
																<Link to={`/user/product/${item.product}`}>{item.title}</Link>
															</div>
															<div className="col-md-2">&#8377;{item.price}</div>
															<div className="col-md-2">
																<select value={item.qty} 
																onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
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
															<div className="col-md-2">
																<button type="button" onClick={()=>removeFromCartHandler(item.product)}>
																	<i className="fa fa-trash"></i>
																</button>
															</div>
														</div>
													</div>	
												))
										}
									</>	
								)
						}
					</div>
					<div className="col-md-4">
						<div className="card">
							<div className="card-header">
								<h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
								&#8377;{cartItems
				                .reduce((acc, item) => acc + item.qty * item.price, 0)
				                .toFixed(2)}
							</div>
							<div>
								<button className="btn btn-dark btn-block" disabled={cartItems.length === 0}
								onClick={checkoutHandler}>Proceed to Checkout</button>
							</div>	
						</div>
					</div>
				</div>
				</div>
			</>
		)
}

export default CartScreen;