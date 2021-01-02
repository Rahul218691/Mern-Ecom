import axios from 'axios';
import {
PRODUCT_CREATE_REQUEST,
PRODUCT_CREATE_SUCCESS,
PRODUCT_CREATE_FAIL,
GET_PRODUCTS_REQUEST,
GET_PRODUCTS_SUCCESS,
GET_PRODUCTS_FAIL,
DELETE_PRODUCT_REQUEST,
DELETE_PRODUCT_SUCCESS,
DELETE_PRODUCT_FAIL,
EDIT_PRODUCT_REQUEST,
EDIT_PRODUCT_SUCCESS,
EDIT_PRODUCT_FAIL,
GET_USER_PRODUCTS_REQUEST,
GET_USER_PRODUCTS_SUCCESS,
GET_USER_PRODUCTS_FAIL,
SINGLE_PRODUCT_REQUEST,
SINGLE_PRODUCT_SUCCESS,
SINGLE_PRODUCT_FAIL,
} from '../constants/productConstants';


export const createProduct = (title,price,description,image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/v1/api/product/addproduct`, {title,price,description,image}, config)

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getProducts = () =>async(dispatch,getState) =>{
  try{
    dispatch({
      type:GET_PRODUCTS_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const {data} = await axios.get('/v1/api/product/adminproducts',config);
    dispatch({
      type:GET_PRODUCTS_SUCCESS,
      payload:data
    })      
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeProduct = (id) =>async(dispatch,getState) =>{
  try{
    dispatch({
      type:DELETE_PRODUCT_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }    
    const {data} = await axios.delete(`/v1/api/product/${id}`,config);
    dispatch({
      type:DELETE_PRODUCT_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editProduct = (id,title,price,description) =>async(dispatch,getState) =>{
  try{
    dispatch({
      type:EDIT_PRODUCT_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }    
    const {data} = await axios.post(`/v1/api/product/${id}`,{title,price,description},config);
    dispatch({
      type:EDIT_PRODUCT_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const getallProducts = () =>async(dispatch) =>{
  try{
    dispatch({
      type:GET_USER_PRODUCTS_REQUEST
    })
    const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    }
    const {data} = await axios.get('/v1/api/product/allproducts',config);
    dispatch({
      type:GET_USER_PRODUCTS_SUCCESS,
      payload:data
    })      
  } catch (error) {
    dispatch({
      type: GET_USER_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST })

    const { data } = await axios.get(`/v1/api/product/details/${id}`)

    dispatch({
      type: SINGLE_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}