import React, { useRef, useState } from 'react'
import style from './Order.module.css'


const isEmpty = value => value.trim() === '';
const isElevenChar = value => value.trim().length === 11;

export const Order = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        address: true,
        phone: true
    })


   const nameInputRef = useRef()
   const addressInputRef = useRef()
   const phoneInputRef = useRef()


const confirmHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredAddress = addressInputRef.current.value
        const enteredPhone = phoneInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPhoneIsValid = isElevenChar(enteredPhone);

        setFormValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            phone: enteredPhoneIsValid
        })

        const formIsValid = enteredAddressIsValid && enteredNameIsValid && enteredPhoneIsValid;

        if(!formIsValid){
            return;
        } 
        props.onConfirmOrder({
            name:enteredName,
            address: enteredAddress,
            phone: enteredPhone
        })    

    }

    const nameStyleControl = `${style.control} ${formValidity.name ? '' : style.invalid}`
    const addressStyleControl = `${style.control} ${formValidity.address ? '' : style.invalid}`
    const phoneStyleControl = `${style.control} ${formValidity.phone ? '' : style.invalid}`

  return (
    <form  className={style.form} onSubmit={confirmHandler}>
        <div className={nameStyleControl}>
            <label htmlFor='name'>Full Name</label>
            <input id='name' type='text' ref={nameInputRef}/>
            {!formValidity.name && <p className={style.error}>Please enter a valid name</p>}
        </div>
        <div className={addressStyleControl}>
            <label htmlFor='address'>Full Address</label>
            <input id='address' type='text' ref={addressInputRef}/>
            {!formValidity.address && <p className={style.error}>Please enter a valid address</p>}
        </div>
        <div className={phoneStyleControl}>
            <label htmlFor='phone'>Phone Number</label>
            <input id='phone' type='text' ref={phoneInputRef}/>
            {!formValidity.phone && <p className={style.error}>Please enter a valid phone number (11 digit number)</p>}
        </div>
        <div className={style.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={style.submit}>Confirm</button>
        </div>
        
    </form>
  )
}

export default Order
