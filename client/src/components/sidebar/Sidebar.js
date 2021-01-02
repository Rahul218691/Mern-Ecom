import React,{useState} from 'react';
import './sidebar.css';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.jpg';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

const Sidebar = ({children}) =>{

  const dispatch = useDispatch()
  const [isActive,setActive] = useState(false);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const toggleClass = () =>{
    setActive(!isActive);
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

	return(
		<div className="wrapper d-flex align-items-stretch">
			<nav id="sidebar" className={isActive ? 'active':null}>
				<div className="p-4 pt-5">
		  		<Link to="#" className="img logo rounded-circle mb-5" style={{backgroundImage:`url(${logo})`}}></Link>
            {
              userInfo && userInfo.isAdmin && (
                  <ul className="list-unstyled components mb-5">
                    <li className="active">
                      <Link to="/admin/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/admin/createProduct">Create Product</Link>
                    </li>
                    <li>
                      <Link to="/admin/orders">Orders</Link>
                    </li>
                  </ul>
              )
            }
	        <div className="footer">
	        	<p>Copyrights &copy; RahulGuptha</p>
	        </div>

	      </div>
    	</nav>

      <div id="content" className="p-4 p-md-5">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">

            <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={toggleClass}>
              <i className="fa fa-bars"></i>
              <span className="sr-only">Toggle Menu</span>
            </button>
            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {
                userInfo && userInfo.isAdmin && (
                  <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item active">
                      <Link className="nav-link" to="#">{userInfo.name.toUpperCase()}</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="#" onClick={logoutHandler}>Logout</Link>
                  </li>
                </ul>                
                )
              }
            </div>
          </div>
        </nav>
        	{children}
      </div>
		</div>
		)
}

export default Sidebar;