import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css";  
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {register} from '../../actions/userActions';
import {USER_REGISTER_RESET} from '../../constants/userConstants';

const UserRegisterScreen = ({location,history}) =>{
  
  const dispatch = useDispatch();	

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) =>{
  	e.preventDefault();
  	if(password !== confirmPassword){
		return new Noty({
			type:'error',
			text:'Password does not match',
			timeout:2000,
			progressBar:false
		}).show(); 		
  	}else{
  		dispatch(register(name,email,password))
  	}
  }

if(error){
  	setTimeout(()=>dispatch({
  		type:USER_REGISTER_RESET
  	}),2000);
}  

return(
		<>
		<div>
			<Navbar/>
		</div>
			<div className="container">
				<h3 className="text-center">Create an Account</h3>
				{loading && <Loader />}
				{error && <Message>{error}</Message>}
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="name">Username</label>
						<input type="text" placeholder="username" className="form-control"
						required autoFocus id="name"
						value={name}
            			onChange={(e) => setName(e.target.value)}/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" placeholder="email" className="form-control"
						id="email" required
						value={email}
            			onChange={(e) => setEmail(e.target.value)}/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" id="password"
						placeholder="******" required
						value={password}
            			onChange={(e) => setPassword(e.target.value)}/>
					</div>
					<div className="form-group">
						<label htmlFor="confpassword">Confirm Password</label>
						<input type="password" className="form-control" id="confpassword"
						placeholder="******" required
						value={confirmPassword}
            			onChange={(e) => setConfirmPassword(e.target.value)}/>
					</div>					
					<div className="text-right">
						<Link to={redirect ? `/user/login?redirect=${redirect}` : '/user/login'}>Already a  User? Click here</Link>
					</div>	
					<div>
						<button className="btn btn-primary" type="submit">Create Account</button>
					</div>
				</form>
			</div>
		</>	
		)
}

export default UserRegisterScreen;