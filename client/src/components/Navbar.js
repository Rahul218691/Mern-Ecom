import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import logo from '../images/diary.gif';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../actions/userActions';

const Navbar = ({query,setQuery,history}) =>{

  const dispatch = useDispatch();	

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const logoutHandler = () =>{
  	dispatch(logout())
  }

	return(
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		  <Link className="navbar-brand" to="#">
		  	<img src={logo} alt="" className="img-fluid rounded-circle" width="60" height="60"/>
		  </Link>
		  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span className="navbar-toggler-icon"></span>
		  </button>

		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
		  	<ul className="navbar-nav mr-auto">
		      <li className="nav-item active">
		        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
		      </li>
		    </ul>
		    {
		    	history.location.pathname === '/' && (
				    <form className="form-inline my-2 my-lg-0">
				      <input className="form-control mr-sm-2" type="search" placeholder="Search Products" aria-label="Search" 
				      value={query}
				      onChange={(e)=>setQuery(e.target.value)}/>
				      <button className="btn btn-outline-success my-2 my-sm-0" type="button" disabled>Search</button>
				    </form>
		    		)
		    }
		    <ul className="navbar-nav ml-auto">
		      <li className="nav-item">
		        <Link className="nav-link mr-2" to="/cart">
		        	 <i className="fa fa-cart-plus" aria-hidden="true" style={{fontSize:'30px'}}></i>
		        </Link>
		      </li>
		      {
		      	userInfo ? (
		      		<>
		      	<li className="nav-item">
		      		<Link to='/profile' className="nav-link" style={{fontSize:'17px'}}>
		      			Profile
		      		</Link>
		      	</li>	
				<li className="nav-item">
					<Link className="nav-link" to="#" onClick={logoutHandler}>
			        	 <i className="fa fa-sign-out" aria-hidden="true" style={{fontSize:'30px'}} title="Logout"></i>
			        </Link>
			      </li>	
		      </>
		      		) :(
				<li className="nav-item">
					<Link className="nav-link" to="/user/login">
			        	 <i className="fa fa-user" aria-hidden="true" style={{fontSize:'30px'}} title="Login"></i>
			        </Link>
			      </li>	
		      		)
		      }
		    </ul>
		  </div>
		</nav>

		)
}

export default withRouter(Navbar);