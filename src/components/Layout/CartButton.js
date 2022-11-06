import React, { useContext, useEffect, useState } from 'react'
import style from './CartButton.module.css'
import Icon from './Icon'
import CartContext from '../../store/cart-context'

const CartButton = (props) => {
const [btnBump, setBtnBump]=useState(false);

const cartCtx = useContext(CartContext)
const { items } = cartCtx;
const numberOfCartItems = items.reduce((curNumber, item)=>{
  return curNumber + item.amount;

}, 0)

  const btnStyle = `${style.button} ${btnBump ? style.bump : ''}`

  useEffect(() => {
    if(items.length === 0) {
      return 
    }

    setBtnBump(true)

   const timer = setTimeout(() => {
      setBtnBump(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }

  },[items])

  return (
    <button className={btnStyle} onClick={props.onClick}>
   
    <span className={style.logo}><Icon/></span>
    <span>My Cart</span>
    <span className={style.badge}>{numberOfCartItems}</span>
       
        
    </button>
  )
}

export default CartButton     