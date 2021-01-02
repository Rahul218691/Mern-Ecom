import React,{useEffect,useState} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector,useDispatch } from 'react-redux'
import {getProducts,removeProduct} from '../../actions/productActions';
import Message from '../../components/Message';
// import Loader from '../../components/Loader';
import ProductTable from '../../components/ProductTable';
import {DELETE_PRODUCT_RESET} from '../../constants/productConstants';
import axios from 'axios';

const AdminHome = ({location,history}) =>{

  const dispatch = useDispatch();			
  const [theader] = useState(["SLNO","Title","Price","Image","Action"]);
  const [query,setQuery] = useState('');

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const adminProducts = useSelector((state) =>state.adminProducts)
  const {loading,products} = adminProducts;

  const productDelete = useSelector((state) =>state.productDelete)
  const {success,error} = productDelete;

	useEffect(()=>{
		if(userInfo && userInfo.isAdmin){
			dispatch(getProducts())
		}else{
			history.push('/admin/login')
		}
	},[history,userInfo,dispatch,success]);

	const deleteHandler = async(id,public_id) =>{
		// console.log(id,public_id)
		await axios.post('/v1/api/images/destroy',{public_id},{
			headers:{
				Authorization:`Bearer ${userInfo.token}`
			}
		})
		dispatch(removeProduct(id));
	}

  function search(rows){
    return rows.filter(row => row.title.toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
  }

	if(error){
	  	setTimeout(()=>dispatch({
	  		type:DELETE_PRODUCT_RESET
	  	}),2000);
	}

	return(
			<>
				<Sidebar>
					<div className="container">
						<div>
							{error && <Message>{error}</Message>}
							<input type="text" className="form-control"
							placeholder="Enter product name"
							value={query}
							onChange={(e)=>setQuery(e.target.value)}/>
						</div>	
						<ProductTable header={theader} data={search(products)} loading={loading} deleteHandler={deleteHandler}/>
					</div>
				</Sidebar>	
			</>
		)
}

export default AdminHome;