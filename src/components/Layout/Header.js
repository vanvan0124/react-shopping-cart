import React from 'react'
import style from './Header.module.css'
import CartButton from './CartButton'

const Header = (props) => {
  return (
    <>
        <header className={style.header}>
            <h1>ThriftPings 🎽</h1>
            <CartButton onClick={props.onShowCart} />
        </header>
    </>
  )
}

export default Header