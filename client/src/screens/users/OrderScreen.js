import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder
} from '../../actions/orderActions';
import Navbar from '../../components/Navbar';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants'
import axios from 'axios'

const OrderScreen = ({match,history}) =>{
	const orderId = match.params.id
	const dispatch = useDispatch()
	const [sdkReady, setSdkReady] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/user/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order,history,userInfo])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }


	return (
			<>
				<div><Navbar /></div>
				<div className="container">
				{
				loading ? (
						<Loader />
					): error ? (
						<Message>{error}</Message>
					): (
						<>
							<h1>Order {order._id}</h1>
							<div className="row">
								<div className="col-md-8">
									<div>
										<h2>Shipping</h2>
										<p>
											<strong>Name: </strong> {order.user.name}
										</p>
										<p>
											<strong>Email: </strong> {' '}
											<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
										</p>
										<p>
											<strong>Address:</strong>
											{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
											{order.shippingAddress.postalCode},{' '}
											{order.shippingAddress.country}
										</p>	
										{
											order.isDelivered ? (
												<Message>Delivered on {order.deliveredAt}</Message>
											):(
												<Message>Not Delivered</Message>
											)
										}		
									</div>	
									<div>
										<h2>Payment Method</h2>
										<p>
											<strong>Method: </strong>
											{order.paymentMethod}
										</p>
										{
											order.isPaid ? (
												<Message>Paid on {order.paidAt}</Message>
											):(
												<Message>Not Paid</Message>
											)
										}
									</div>	

									<div>
										<h2>Order Items</h2>
										{
											order.orderItems.length === 0 ? (
												<Message>Order is empty</Message>
											):(
												<div>
													{
														order.orderItems.map((item,i) =>(
															<div key={i} className="mb-2">
																<div className="row">
																	<div className="col-md-1">
																		<img src={item.image} alt={item.title} className="img-fluid rounded" />
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
												&#8377;{order.itemsPrice}
											</div>
										</div>

										<div className="row">
											<div className="col">
												Shipping
											</div>
											<div className="col">
												&#8377;{order.shippingPrice}
											</div>
										</div>

										<div className="row">
											<div className="col">
												Tax
											</div>
											<div className="col">
												&#8377;{order.taxPrice}
											</div>
										</div>

										<div className="row">
											<div className="col">
												Total
											</div>
											<div className="col">
												&#8377;{order.totalPrice}
											</div>
										</div>

										<div>
											{
												!order.isPaid && (
													<div>
														{loadingPay && <Loader/>}
														{!sdkReady ? (
																<Loader />
															):(
																<PayPalButton amount={order.totalPrice}
																currency="INR"
																onSuccess={successPaymentHandler}/>
															)}
													</div>	
												)
											}
										</div>
										{loadingDeliver && <Loader/>}
										{
											userInfo && userInfo.isAdmin &&
											order.isPaid && 
											!order.isDelivered && (
												<div>
													<button type="button" className="btn btn-dark btn-block"
													onClick={deliverHandler}>
														Mark As Delivered
													</button>
												</div>	
											)
										}
									</div>
								</div>
							</div>
						</>
						)}
				</div>	
			</>
		)
}

export default OrderScreen;