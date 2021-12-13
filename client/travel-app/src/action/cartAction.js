import { ADD_ITEMS_CART, REMOVE_ITEMS_CART } from './actionTypes'
import axios from 'axios'

export const addToCartAct = (propertyId) => async (dispatch, getState) => {
  let getPropDetURL = `/property/${propertyId}`
  let { data } = await axios.get(getPropDetURL)
  let response = data.response
  let colInfo = { ...response, hostName: data.host }
  dispatch({
    type: ADD_ITEMS_CART,
    payload: {
      product: colInfo._id,
      title: colInfo.title,
      price: colInfo.price,
      rating: colInfo.ratings,
      amenities: colInfo.amenities,
      image: colInfo.images[0],
      shortDescription: colInfo.shortDescription,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeCartItem = (id) => async (dispatch, getState) => {
  console.log(id)
  dispatch({ type: REMOVE_ITEMS_CART, payload: id })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
