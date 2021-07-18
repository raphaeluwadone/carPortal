import React, { useState, useEffect, useContext } from 'react'
import CartToast from '../components/CartToast'
import styles from "../styles/Store.module.css";
import { cartContext } from '../utils/CartContext'
import Link from 'next/link'
import { getNumberWithCommas } from '../utils/functions'
import { v4 as uuidv4 } from 'uuid';

function StoreItem({item}) {

    const [showCartToast, setShowCartToast] = useState(false);
    const [cart, setCart] = useContext(cartContext);

    const addToCart = (img, name, stock, price) => {
        // let currentCart = JSON.parse(localStorage.getItem('carPortalCart')) ? JSON.parse(localStorage.getItem('carPortalCart')) : []
        const newCart = [...cart, 
            {
             img,
             stock,
             id: uuidv4(),
             name,
             price,
             qty: 1
            }
        ]
        // localStorage.setItem('carPortalCart', JSON.stringify(newCart))
        setCart(newCart)
        console.log(cart);
        setShowCartToast(true)
    }

    useEffect(() => {
        const timer =setInterval(() => {
            setShowCartToast(false)
        }, 3000);
        return () => {
            clearInterval(timer)
        }
    }, [showCartToast])


    return (
        <>
             <div className={styles.single_store}>
                    <h2>{item.name}</h2>
                    <div className={styles.single_content}>
                        <img src={item.images[0]} alt=""/>
                        <div className={styles.price_content}>
                            <p className={styles.new_price}>{'\u20A6'}{getNumberWithCommas(item.new_price)}</p>
                            <div className={styles.discount}>
                                <p className={styles.old_price}>{'\u20A6'}{getNumberWithCommas(item.old_price)}</p>
                                <p className={styles.perc}>{item.discount}</p>
                            </div>
                        </div>
                          <p className={styles.item_desc}>[{item.merch_size}]</p>
                        </div> 
                    <div className={styles.btn_cart_container}>
                      <div className={styles.link_btn}>
                        <Link href={`/stores/merch/${item.id}`} as={`/stores/merch/${item.id}`}>View More</Link>
                      </div>
                      <button className={styles.add_btn} onClick={() => addToCart(item.images[0], item.name, item.stock,  item.new_price)}>
                        Add to Cart
                      </button>
                    </div>
                    {showCartToast && <CartToast />}
                  </div>
        </>
    )
}

export default StoreItem
