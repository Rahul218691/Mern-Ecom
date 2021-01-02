import React,{useEffect,useState} from 'react';
import Navbar from '../../components/Navbar';
import {useSelector,useDispatch} from 'react-redux';
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css"; 
import {getUserDetails,updateUserProfile} from '../../actions/userActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {Link} from 'react-router-dom';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { listMyOrders } from '../../actions/orderActions';


const ProfileScreen = ({location,history}) =>{
 
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() =>{
  	if(!userInfo){
  		history.push('/user/login')
  	}else{
  		if(!user || !user.name){
  			dispatch({type:USER_UPDATE_PROFILE_RESET})
  			dispatch(getUserDetails('profile'))
  			dispatch(listMyOrders())
  		}else{
  			setName(user.name)
  			setEmail(user.email)
  		}
  	}
  },[history,userInfo,dispatch,user,success])

  const profileSubmitHandler = (e) =>{
  	e.preventDefault();
  	if(password !== confirmPassword){
 		return new Noty({
			type:'error',
			text:'Password does not match',
			timeout:2000,
			progressBar:false
		}).show();  		
  	}else{
  		dispatch(updateUserProfile({ id: user._id, name, email, password }))
  	}
  }

if(success){
  	setTimeout(()=>dispatch({
  		type:USER_UPDATE_PROFILE_RESET
  	}),2000);
}  

	return (
			<>
				<div><Navbar/></div>
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<h2>User Profile</h2>
							{success && <Message>Profile Updated Successfully</Message>}
							{
								loading ? (
										<Loader />
									): error ?(
										<Message>{error}</Message>
									):(
									    <form onSubmit={profileSubmitHandler}>
											<div className="form-group">
												<label htmlFor="name">Name</label>
												<input type="text" placeholder="username" 
												className="form-control"
												value={name}
												onChange={(e)=>setName(e.target.value)}/>
											</div>
											<div className="form-group">
												<label htmlFor="email">Email</label>
												<input type="email" placeholder="email"
												readOnly value={email} 
												className="form-control"/>
											</div>
											<div className="form-group">
												<label htmlFor="password">Password</label>
												<input type="password" placeholder="*****"
												value={password}
												onChange={(e)=>setPassword(e.target.value)}
												className="form-control"/>
											</div>
											<div className="form-group">
												<label htmlFor="confpassword">ConfirmPassword</label>
												<input type="password" placeholder="*****"
												value={confirmPassword}
												onChange={(e)=>setConfirmPassword(e.target.value)}
												className="form-control"/>
											</div>
											<div>
												<button className="btn btn-dark btn-block" type="submit">
													Update
												</button>
											</div>
										</form>
									)
							}
						</div>
						<div className="col-md-9">
							<h2>My Orders</h2>
							{loadingOrders ? (
								<Loader />
								): errorOrders ? (
									<Message>{errorOrders}</Message>
								):(
									<table className="table table-striped table-bordered table-hover table-responsive-sm">
											<thead>
												<tr>
													<th>ID</th>
													<th>DATE</th>
													<th>TOTAL</th>
													<th>PAID</th>
													<th>DELIVERED</th>
													<th></th>
												</tr>	
											</thead>	
											<tbody>
								              {orders.map((order) => (
								                <tr key={order._id}>
								                  <td>{order._id}</td>
								                  <td>{order.createdAt.substring(0, 10)}</td>
								                  <td>&#8377;{order.totalPrice}</td>
								                  <td>
								                    {order.isPaid ? (
								                      order.paidAt.substring(0, 10)
								                    ) : (
								                      <i className='fa fa-times' style={{ color: 'red' }}></i>
								                    )}
								                  </td>
								                  <td>
								                    {order.isDelivered ? (
								                      order.deliveredAt.substring(0, 10)
								                    ) : (
								                      <i className='fa fa-times' style={{ color: 'red' }}></i>
								                    )}
								                  </td>
								                  <td>
								                    <Link to={`/order/${order._id}`}>
								                      <button className='btn-sm'>
								                        Details
								                      </button>
								                    </Link>
								                  </td>
								                </tr>
								              ))}
											</tbody>	
										</table>
								)}
						</div>	
					</div>
				</div>
			</>
		)
}

export default ProfileScreen;