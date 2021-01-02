import React from 'react';
import {Link} from 'react-router-dom';

const ProductCard = ({product}) =>{
	return(
			<>
			<div className="card mt-2">
			  <img src={product.image.url} className="card-img-top" alt="..." />
			  <div className="card-body">
			    <h5 className="card-title">{product.title}</h5>
			    <Link to={`/user/product/${product._id}`} className="btn btn-primary">View Product <i className="fa fa-eye"></i></Link> <span style={{float:'right'}}><b>Price:</b> &#8377; {product.price}</span>
			  </div>
			</div>													
			</>
		)
}

export default ProductCard;