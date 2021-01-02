import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import {useSelector,useDispatch} from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {USER_LOGIN_RESET} from '../../constants/userConstants';
import {login} from '../../actions/userActions';

const UserLoginScreen = ({location,history}) =>{

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])


  const submitHandler = (e) =>{
  	e.preventDefault();
  	dispatch(login(email,password))
  }

if(error){
  	setTimeout(()=>dispatch({
  		type:USER_LOGIN_RESET
  	}),2000);	
}

	return(
		<>
		<div>
			<Navbar/>
		</div>
			<div className="container">
				<h3 className="text-center">Account Login</h3>
				{loading && <Loader />}
				{error && <Message>{error}</Message>}
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" placeholder="email" className="form-control"
						id="email" autoFocus required
						value={email}
						onChange={(e)=>setEmail(e.target.value)}/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" id="password"
						placeholder="******" required
						value={password}
						onChange={(e)=>setPassword(e.target.value)}/>
					</div>
					<div className="text-right">
						<Link to={redirect ? `/user/register?redirect=${redirect}` : '/user/register'}>New User? Click here</Link>
					</div>	
					<div>
						<button className="btn btn-primary">Login</button>
					</div>
				</form>
			</div>
		</>	
		)
}

export default UserLoginScreen;