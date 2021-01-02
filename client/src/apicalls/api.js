

export const getProduct = (id,token) =>{
	return fetch(`/v1/api/product/${id}`,{
		method:'GET',
		headers:{
			Authorization:`Bearer ${token}`
		}
	}).then(response =>{
		return response.json();
	}).catch(err=>console.log(err))
}

// export const updateproduct = (id,token,title,price,description) =>{
// 	// console.log(title,price,description)
// 	return fetch(`/v1/api/product/${id}`,{
// 		method:'POST',
// 		headers:{
// 			Authorization:`Bearer ${token}`
// 		},
// 		body:JSON.stringify({title,price,description})
// 	}).then(response=>{
// 		return response.json();
// 	}).catch(err=>{
// 		console.log(err)
// 	})
// }