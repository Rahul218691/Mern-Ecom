import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import { savePaymentMethod } from '../../actions/cartActions';
import Navbar from '../../components/Navbar';


const PaymentScreen = ({history}) =>{

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if(!shippingAddress){
  	history.push('/user/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

	return (
		<>
		<div><Navbar /></div>
			<div className="container">
				<div>
					<CheckoutSteps step1 step2 step3 />
					<h1>Payment Method</h1>
					<form onSubmit={submitHandler}>
						<div className="form-check">
						  <input className="form-check-input" type="checkbox"
						   value={paymentMethod} id="defaultCheck1" 
						   checked
						   onChange={(e) => setPaymentMethod(e.target.value)}/>
						  <label className="form-check-label" htmlFor="defaultCheck1">
						    PayPal
						  </label>
						</div>
						<div>
							<button type="submit" className="btn btn-dark">Continue</button>
						</div>	
					</form>
				</div>	
			</div>
		</>	
		)
}

export default PaymentScreen;