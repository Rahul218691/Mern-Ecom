import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from './reducers/userReducers'

import {
	productCreateReducer,
  getProductsReducer,
  deleteProductReducer,
  editProductReducer,
  getUserProductsReducer,
  productDetailsReducer
} from './reducers/productReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
  orderDeliverReducer
} from './reducers/orderReducer'

import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
	userLogin: userLoginReducer,
  userRegister:userRegisterReducer,
	createdProduct:productCreateReducer,
  adminProducts:getProductsReducer,
  productDelete:deleteProductReducer,
  productEdit:editProductReducer,
  userProducts:getUserProductsReducer,
  detailedProduct:productDetailsReducer,
  cart:cartReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
});



const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}  

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;