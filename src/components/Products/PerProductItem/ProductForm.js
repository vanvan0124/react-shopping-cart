import React, { useRef, useState } from 'react'
import Input from '../../UI/Input'
import style from './ProductForm.module.css'


const ProductForm = (props) => {
const [amountIsValid, setAmountIsValid]=useState(true)

const amountInputRef = useRef();
const submitHandler = event => {
  event.preventDefault()

  const enteredAmount = amountInputRef.current.value;
  const enteredAmountNumber = +enteredAmount;

  if(enteredAmount.trim().lenght === '' || enteredAmountNumber < 1 || enteredAmountNumber > 5){
    setAmountIsValid(false)
    return
  }

  props.onAddToCart(enteredAmountNumber);

}



  return (
   <form className={style.form} onSubmit={submitHandler}>
    <Input
        ref={amountInputRef} 
        label='Amount'
        input={{
            id: 'amount' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }}/>
    <button>+ Add</button>
    {!amountIsValid && <p>Enter a valid amount</p>}
   </form>
  )
}

export default ProductForm