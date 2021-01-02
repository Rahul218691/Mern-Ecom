import React,{useState,useEffect} from 'react';
import './login.css';
import './util.css';
import { login } from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../components/Message';
import Loader from '../../../components/Loader';

const LoginScreen = ({location,history}) =>{

	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;

	useEffect(()=>{
		if(userInfo){
			history.push('/admin/home');
		}
	},[history,userInfo])

	const handleSubmit = e =>{
		e.preventDefault();
		dispatch(login(email, password))
	}

	return(
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
					      {error && <Message>{error}</Message>}
      					  {loading && <Loader />}
						<form className="login100-form validate-form flex-sb flex-w" onSubmit={handleSubmit}>
							<span className="login100-form-title p-b-32">
								Account Login
							</span>
							<span className="txt1 p-b-11">
								Email
							</span>
							<div className="wrap-input100 validate-input m-b-36">
								<input className="input100" type="email" name="email" 
								value={email}
								onChange={(e)=>setEmail(e.target.value)}
								autoFocus
								required/>
								<span className="focus-input100"></span>
							</div>
							<span className="txt1 p-b-11">
								Password
							</span>
							<div className="wrap-input100 validate-input m-b-12">
							
								<input className="input100" type="password" name="pass" 
								value={password}
								onChange={(e)=>setPassword(e.target.value)}/>
								<span className="focus-input100"></span>
							</div>
							<div className="flex-sb-m w-full p-b-48">
							</div>
							<div className="container-login100-form-btn">
								<button className="login100-form-btn" type="submit">
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>		
		)
}

export default LoginScreen;