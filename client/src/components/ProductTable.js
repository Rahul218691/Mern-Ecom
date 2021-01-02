import React from 'react';
import Loader from './Loader';
import {Link} from 'react-router-dom';

const ProductTable = ({header,data,loading,deleteHandler}) =>{

	return loading? <Loader /> :(
			<table cellPadding={0} cellSpacing={0} className="table table-striped table-responsive-sm">
				<thead>
					<tr>
						{
							header.map((head,i) =>(
									<th key={i}>{head}</th>
								))
						}
					</tr>
				</thead>
				<tbody>
					{
					 data.map((row,i)=>(
							<tr key={i}>
								<td>{i+1}</td>
								<td>{row.title}</td>
								<td>&#8377; {row.price}</td>
								<td>
									<img src={row.image.url} alt="" width="60" height="60"/>
								</td>	
								<td>
								<Link to={`/admin/editproduct/${row._id}`} className="btn btn-primary"><i className="fa fa-edit" aria-hidden="true"></i></Link> {' '}
								<button className="btn btn-danger" onClick={()=>deleteHandler(row._id,row.image.public_id)}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
							</tr>
						))
					}
				</tbody>	
			</table>
		)
}

export default ProductTable;