import { ADD_ITEMS_CART, REMOVE_ITEMS_CART } from '../action/actionTypes'

export const addToCartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_ITEMS_CART:
      const item = action.payload
      const isItemExist = state.cartItems.find(
        (elem) => elem.product === item.product
      )
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case REMOVE_ITEMS_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (elem) => elem.product !== action.payload
        ),
      }
    default:
      return state
  }
}
