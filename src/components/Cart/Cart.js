import React, { useContext, useState } from 'react'
import Modal from '../UI/Modal'
import style from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Order from './Order'
import Swal from 'sweetalert2'

const Cart = (props) => {
const [order, setOrder] = useState(false)
const cartCtx = useContext(CartContext)

const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
const hasItems = cartCtx.items.length > 0;
const cartItemRemoveHandler = id => {
  cartCtx.removeItem(id)
}
const cartItemAddHandler = item => {
  cartCtx.addItem({...item, amount:1})
}

const orderHandler = () => {
  setOrder(true)
}

const confirmOrderHandler = userData => {
  fetch('https://react-db-eed03-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
    method : 'POST',
    body: JSON.stringify({
      user : userData,
      orderedItems: cartCtx.items
    })
  })
  Swal.fire({
    title: 'Successful',
    icon: 'success',
    text: 'You place your order!'
  })

}

const cartItems =   <ul className={style['cart-items']}>{cartCtx.items.map((item) => <CartItem 
        key={item.id} 
        name={item.name} 
        amount ={item.amount}
        price={item.price}
        onRemove= {cartItemRemoveHandler.bind(null, item.id)}
        onAdd ={cartItemAddHandler.bind(null, item)}
        />)}
        </ul>


  return (
    <Modal  onClose={props.onClose}>
        {cartItems}
        <div className={style.total}>
            <span>Total</span>
            <span>{totalAmount}</span>
        </div>
        {order && <Order onCancel={props.onClose} onConfirmOrder = {confirmOrderHandler} />}
        {!order && <div className={style.actions}> 
            <button className={style['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={style.button} onClick={orderHandler}>Order</button>}
        </div>}
    </Modal>
  )
}

export default Cart