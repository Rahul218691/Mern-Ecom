import {
PRODUCT_CREATE_REQUEST,
PRODUCT_CREATE_SUCCESS,
PRODUCT_CREATE_FAIL,
PRODUCT_RESET,
GET_PRODUCTS_REQUEST,
GET_PRODUCTS_SUCCESS,
GET_PRODUCTS_FAIL,
GET_PRODUCTS_RESET,
DELETE_PRODUCT_REQUEST,
DELETE_PRODUCT_SUCCESS,
DELETE_PRODUCT_FAIL,
DELETE_PRODUCT_RESET,
EDIT_PRODUCT_REQUEST,
EDIT_PRODUCT_SUCCESS,
EDIT_PRODUCT_FAIL,
EDIT_PRODUCT_RESET,
GET_USER_PRODUCTS_REQUEST,
GET_USER_PRODUCTS_SUCCESS,
GET_USER_PRODUCTS_FAIL,
GET_USER_PRODUCTS_RESET,
SINGLE_PRODUCT_REQUEST,
SINGLE_PRODUCT_SUCCESS,
SINGLE_PRODUCT_FAIL,
SINGLE_PRODUCT_RESET
} from '../constants/productConstants';


export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success:true, message: action.payload.message }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

export const getProductsReducer = (state={products:[]},action) =>{
  switch(action.type){
    case GET_PRODUCTS_REQUEST:
      return {loading:true,products:[]}
    case GET_PRODUCTS_SUCCESS:
      return {loading:false,products:action.payload}
    case GET_PRODUCTS_FAIL:
      return {loading:false,error:action.payload}
    case GET_PRODUCTS_RESET:
      return {products:[]}
    default:
      return state;        
  }
}

export const deleteProductReducer = (state={},action) =>{
  switch(action.type){
    case DELETE_PRODUCT_REQUEST:
      return {loading:true}
    case DELETE_PRODUCT_SUCCESS:
      return {loading:false,success:true,message:action.payload.message}
    case DELETE_PRODUCT_FAIL:
      return {loading:false,error:action.payload}
    case DELETE_PRODUCT_RESET:
      return {}  
    default:
      return state;      
  }
}


export const editProductReducer = (state={},action) =>{
  switch(action.type){
    case EDIT_PRODUCT_REQUEST:
      return {loading:true}
    case EDIT_PRODUCT_SUCCESS:
      return {loading:false,success:true,message:action.payload.message}
    case EDIT_PRODUCT_FAIL:
      return {loading:false,error:action.payload}
    case EDIT_PRODUCT_RESET:
      return {}  
    default:
      return state;      
  }
}


export const getUserProductsReducer = (state={userproducts:[]},action) =>{
  switch(action.type){
    case GET_USER_PRODUCTS_REQUEST:
      return {loading:true,userproducts:[]}
    case GET_USER_PRODUCTS_SUCCESS:
      return {loading:false,userproducts:action.payload}
    case GET_USER_PRODUCTS_FAIL:
      return {loading:false,error:action.payload}
    case GET_USER_PRODUCTS_RESET:
      return {userproducts:[]}
    default:
      return state;        
  }
}

export const productDetailsReducer = (state={product:{image:{}}},action) =>{
  switch(action.type){
    case SINGLE_PRODUCT_REQUEST:
      return {...state,loading:true}
    case SINGLE_PRODUCT_SUCCESS:
      return {loading:false,product:action.payload}
    case SINGLE_PRODUCT_FAIL:
      return {loading:false,error:action.payload}
    case SINGLE_PRODUCT_RESET:
      return {}
    default:
      return state        
  }
}