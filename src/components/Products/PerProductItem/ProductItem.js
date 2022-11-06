import React, { useContext } from 'react'
import style from './ProductItem.module.css'
import ProductForm from './ProductForm'
import CartContext from '../../../store/cart-context'

const ProductItem = (props) => {

const cartCtx = useContext(CartContext)
const price = `$${props.price.toFixed(2)}`
 
 const addToCartHandler = amount => {
    cartCtx.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price
    })
 }

  return (
    
        <div className={style.card}>
            <div className={style.img}></div>
            <h3>{props.name}</h3>
            <h3 className={style.price}>{price}</h3>
            <div>
                <ProductForm onAddToCart={addToCartHandler}/>
            </div>
        </div>      
  
  )
}

export default ProductItem