import React from 'react';

const Message = ({children}) =>{

	return(
		<div className="alert alert-warning alert-dismissible fade show" role="alert" >
		  	{children}
		</div>
		)
}

export default Message;