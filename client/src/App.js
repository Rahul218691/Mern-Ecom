import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import AdminHome from './screens/admin/AdminHome';
import LoginScreen from './screens/admin/auth/LoginScreen';
import CreateProduct from './screens/admin/CreateProduct';
import EditProduct from './screens/admin/EditProduct';
import HomeScreen from './screens/home/HomeScreen';
import UserLoginScreen from './screens/users/UserLoginScreen';
import UserRegisterScreen from './screens/users/UserRegisterScreen';
import ProductDetails from './screens/home/ProductDetails';
import CartScreen from './screens/users/CartScreen';
import ShippingScreen from './screens/users/ShippingScreen';
import PaymentScreen from './screens/users/PaymentScreen';
import PlaceOrderScreen from './screens/users/PlaceOrderScreen';
import ProfileScreen from './screens/users/ProfileScreen';
import OrderScreen from './screens/users/OrderScreen';
import OrderListScreen from './screens/admin/OrderListScreen';

const App = () =>{
  return (
    <BrowserRouter>
    	<Switch>
            <Route component={HomeScreen} exact path='/'/>
    		<Route component={AdminHome} path='/admin/home' exact/>
    		<Route component={LoginScreen} path='/admin/login' exact/>
    		<Route component={CreateProduct} path='/admin/createProduct' exact/>
    		<Route component={EditProduct} path='/admin/editproduct/:id' exact/>
            <Route component={UserLoginScreen} path='/user/login' exact/>
            <Route component={UserRegisterScreen} path='/user/register' exact/>
            <Route component={ProductDetails} path='/user/product/:id' exact/>
            <Route component={CartScreen} path='/cart/:id?' exact/>
            <Route component={ShippingScreen} path='/user/shipping' exact/>
            <Route component={PaymentScreen} path='/payment' exact/>
            <Route component={PlaceOrderScreen} path='/placeorder' exact/>
            <Route component={ProfileScreen} path='/profile' exact/>
            <Route path='/order/:id' component={OrderScreen} exact/>
            <Route path='/admin/orders' component={OrderListScreen} exact/>
    	</Switch>	
    </BrowserRouter>	
  );
}

export default App;
