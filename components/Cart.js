import React, {useContext, useState, useEffect} from 'react'
import styles from '../styles/Cart.module.css'
import { cartContext } from '../utils/cartContext'
import { CgTrash } from "react-icons/cg"
import { BsBoxArrowInLeft } from "react-icons/bs";
import SingleItem from './SingleItem'



function Cart({hideShow}) {



    const setLocalStorage = (payload = []) => {
        localStorage.setItem('carPortalCart', JSON.stringify(payload))
    }


    const [cart, setCart] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('carPortalCart')))
        setLoading(false)
    }, [])


    const clearCart = () => {
        setCart([])
        setLocalStorage()
    }

    const deleteFromCart = (itemId) => {
        let newCart = cart.filter(item => item.id !== itemId)
        setCart(newCart)
        setLocalStorage(newCart)
    }
    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div className={styles.cart_body}>
             <main className={styles.cart_container} >
             <BsBoxArrowInLeft className={styles.close_cart} onClick={hideShow}/>
        <div className={styles.cart_info}>
            <p>Cart: ({cart.length})</p>
            <div className={styles.clear} onClick={clearCart}>
                <p onClick={clearCart}>Clear Cart</p>
                <CgTrash onClick={clearCart} style={{cursor: 'pointer', fontSize: '30px'}}/>
            </div>
        </div>
        {
            cart.map((item, i) => {
                return(
                    <SingleItem item={item} key={i} deleteFromCart={deleteFromCart}/>
                )
            })
        }
        <div className={styles.cart_btn}>
            <button>Checkout</button>
        </div>
    </main>
        </div>
    )
}

export default Cart
