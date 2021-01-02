import React,{useEffect} from 'react';
import Navbar from '../../components/Navbar';
import CheckoutSteps from '../../components/CheckoutSteps';
import { useSelector,useDispatch } from 'react-redux'
import Message from '../../components/Message';
import {Link} from 'react-router-dom';
import { createOrder } from '../../actions/orderActions'


const PlaceOrderScreen = ({history}) =>{

	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart);

	const addDecimals = (num) =>{
		return (Math.round(num*100) / 100).toFixed(2)
	}

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])


  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

	return(
			<>
				<div><Navbar /></div>
				<div className="container">
					<CheckoutSteps step1 step2 step3 step4 />
					<div className="row">
						<div className="col-md-8">
							<div>
								<h2>Shipping</h2>
								<p>
									<strong>Address:</strong>
		                			{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
					                {cart.shippingAddress.postalCode},{' '}
				               	    {cart.shippingAddress.country}
								</p>	
							</div>	
							<div>
								<h2>Payment Method</h2>
								<strong>Method:</strong>
								{cart.paymentMethod}
							</div>	
							<div>
								<h2>Order Items</h2>
								{
									cart.cartItems.length === 0 ?(
											<Message>Your cart is empty</Message>
										) : (
											<div>
												{
													cart.cartItems.map((item,i) =>(
														<div key={i} className="mb-2">
															<div className="row">
																<div className="col-md-1">
																	<img src={item.image} alt={item.title} className="img-fluid rounded"/>
																</div>
																<div className="col">
																		<Link to={`/user/product/${item.product}`}>{item.title}</Link>
																</div>
																<div className="col-md-4">
																	{item.qty} x &#8377;{item.price} = &#8377;{item.qty * item.price}
																</div>
															</div>
														</div>
													))
												}
											</div>	
										)
								}
							</div>	
						</div>
						<div className="col-md-4">
							<div className="card">
								<div className="card-header"> 
									<h2>Order Summary</h2>
								</div>

								<div className="row">
									<div className="col">
										Items
									</div>
									<div className="col">
										&#8377;{cart.itemsPrice}
									</div>
								</div>

								<div className="row">
									<div className="col">
										Shipping
									</div>
									<div className="col">
										&#8377;{cart.shippingPrice}
									</div>
								</div>

								<div className="row">
									<div className="col">
										Tax
									</div>
									<div className="col">
										&#8377;{cart.taxPrice}
									</div>
								</div>

								<div className="row">
									<div className="col">
										Total
									</div>
									<div className="col">
										&#8377;{cart.totalPrice}
									</div>
								</div>

								<div>
									{error && <Message>{error}</Message>}
								</div>
								<div>
								<button className="btn btn-dark btn-block"
								disabled={cart.cartItems === 0}
								onClick={placeOrderHandler}>Place Order</button>
								</div>	

							</div>
						</div>
					</div>
				</div>
			</>
		)
}

export default PlaceOrderScreen;