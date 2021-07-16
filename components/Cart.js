import React, {useContext, useState, useEffect} from 'react'
import styles from '../styles/Cart.module.css'
import { cartContext } from '../utils/CartContext'
import { userContext } from '../utils/CartContext'
import { CgTrash } from "react-icons/cg"
import { BsBoxArrowInLeft } from "react-icons/bs";
import SingleItem from './SingleItem'
import { getNumberWithCommas } from '../utils/functions'
import PaymentComponent from '../utils/FlutterWave'




function Cart({hideShow}) {


    const [ cartPrices, setCartPrices ] = useState([])
    const [sumTotal, setSumTotal] = useState([])
    // const setLocalStorage = (payload = []) => {
    //     localStorage.setItem('carPortalCart', JSON.stringify(payload))
    // }
    const [cart, setCart] = useContext(cartContext)
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(cart);
    }, [])
    
    // useEffect(() => {
    //     const cartData = JSON.parse(localStorage.getItem('carPortalCart'))
    //     setCart(cartData)
    //     const price = cartData?.map((item, i) => (
    //         {
    //             id: item.id,
    //             price: item.price
    //         }
    //     ))
    //     setCartPrices(price)
    //     console.log(price);
    //     setLoading(false)
    // }, [])


    const pricesUpdate = (payload) => {
        setCartPrices(payload)
    }

    // useEffect(() => {
    //     const newCart = cart?.map((item,i) =>(
    //         {
    //             id: item.id,
    //             price: item.price
    //         }
    //     ))
    //     console.log(newCart);
    //     setCartPrices(newCart)
    // }, [cart])


    const clearCart = () => {
        setCart([])
    }

    useEffect(() => {
        const sumTotal = cart.reduce((total, prod) => {
           return total + (prod.qty * prod.price)
        },0)
        setSumTotal(sumTotal)
       }, [cart])

    const deleteFromCart = (itemId) => {
        let newCart = cart.filter(item => item.id !== itemId)
        setCart(newCart)
    }
    if (!cart) {
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
                    <SingleItem item={item} key={i} deleteFromCart={deleteFromCart} indPrices={cartPrices} pricesUpdate={pricesUpdate}/>
                )
            })
        }
        <div className={styles.sum_total}>
        {cart.length > 0 && <h5>{'\u20A6'}{getNumberWithCommas(sumTotal)}</h5>}
        </div>
        <div className={styles.cart_btn} style={{opacity: `${cart?.length > 0 ? '1' : '0'}`}}>
            <PaymentComponent sumTotal={sumTotal}/>
        </div>
    </main>
        </div>
    )
}

export default Cart
