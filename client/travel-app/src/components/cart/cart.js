import React from 'react'
import './cart.css'
import { useSelector } from 'react-redux'
import CartItem from '../cartItem/cartItem'

function Cart() {
  let { cartItems } = useSelector((state) => state.cart)
  return (
    <section className="cartSec">
      {cartItems ? (
        <>
          {cartItems.map((elem, index) => {
            return <CartItem key={`cartItem${index}`} prop={elem} />
          })}
        </>
      ) : (
        'noItems to load'
      )}
    </section>
  )
}

export default Cart
