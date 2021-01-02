import React,{useEffect,useState} from 'react';
import './home.css';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
import {getallProducts} from '../../actions/productActions';

const HomeScreen = () =>{

  const dispatch = useDispatch();

  const [query,setQuery] = useState('');		

  const userProducts = useSelector((state) => state.userProducts)
  const { loading,userproducts } = userProducts;  

  useEffect(() =>{
  	dispatch(getallProducts());
  },[dispatch])


  function search(rows){
    return rows.filter(row => row.title.toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
  }  

	return (
			<>
				<div>
					<Navbar query={query} setQuery={setQuery}/>	
				</div>
				<div className="container">
					<div className="row">
						{loading && <Loader />}
						{
							userproducts.length > 0 && search(userproducts).map((product,i) =>{
								return(
										<div className="col-md-4 mb-2" key={i}>
											<ProductCard product={product}/>
										</div>
									)
							})
						}											
					</div>
				</div>	
			</>
		)
}

export default HomeScreen;