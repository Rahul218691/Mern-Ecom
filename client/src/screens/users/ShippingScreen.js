import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../../components/CheckoutSteps'
import { saveShippingAddress } from '../../actions/cartActions'
import Navbar from '../../components/Navbar';

const ShippingScreen = ({ history }) => {

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <>
    <div><Navbar /></div>
    <div className="container">
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text"
            placeholder='Enter address'
            value={address}
            required
            id="address"
            onChange={(e) => setAddress(e.target.value)} 
            className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" 
           placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)} 
            className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="postalcode">Postal Code</label>
          <input type="text" 
          placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)} 
            className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" placeholder='Enter country'
          value={country} required onChange={(e) => setCountry(e.target.value)}
          className="form-control"/>
        </div>
        <div>
          <button type="submit" className="btn btn-dark">Continue</button>
        </div>  
      </form>
    </div>
  </>
  )
}

export default ShippingScreen;
