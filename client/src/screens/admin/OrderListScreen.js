import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {listOrders} from '../../actions/orderActions';
import {Link} from 'react-router-dom';

const OrderListScreen = ({history}) =>{
 
  const dispatch = useDispatch()	

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  useEffect(() =>{
  	if(userInfo && userInfo.isAdmin){
  		dispatch(listOrders())
  	}else{
  		history.push('/admin/login')
  	}
  },[dispatch,history,userInfo])

	return (
			<>
				<Sidebar>
					<div className="container">
						<h1>Orders</h1>
					      {loading ? (
					        <Loader />
					      ) : error ? (
					        <Message>{error}</Message>
					      ) : (
					        <table className="table table-striped table-bordered table-hover table-responsive-sm">
					          <thead>
					            <tr>
					              <th>ID</th>
					              <th>USER</th>
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
					                <td>{order.user && order.user.name}</td>
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
				</Sidebar>	
			</>
		)
}

export default OrderListScreen;
