import React, { useState, useContext, useEffect } from "react";
import { GiCancel } from "react-icons/gi"
import styles from '../styles/Cart.module.css'
import { cartContext } from '../utils/CartContext'
import { getNumberWithCommas } from '../utils/functions'

function SingleItem({item, deleteFromCart, indPrices, pricesUpdate}) {

    const [qty, setQty] = useState(1)
    const [sumTotal, setSumTotal] = useState(item.price)
    const [totalPrice, setTotalPrice] = useState('')
    const [cart, setCart] = useContext(cartContext)
    const [cartPrices, setCartPrices] = useState([])

  const priceCompute = (qty) => {
    let prices = indPrices?.map(element => {
      if (element.id == item.id) {
        return {id: element.id, price: element.price * qty}
      }else{
        return element
      }
    })
    console.log(prices);
    return prices
  }


    const subTotal = () => {
      const newTotal = qty * item.price
      setSumTotal(newTotal)
    }

    const dec = () => {
      if (qty <= 1) {
        return
      }
      if (qty > 1) {
        setQty(qty - 1)
        let newCart = cart.map( (product ,i) => {
          if (product.id == item.id) {
            console.log(item.id, qty);
              return {...product, qty: qty - 1}
          }else {
            return product
          }
        })
        console.log(newCart);
        setCart(newCart)
    }
    }

    const inc = (stock) => {
      if (qty >= stock) {
        return
      }if (qty < stock) {
        setQty(qty + 1)
        let newCart = cart.map( (product ,i) => {
          if (product.id == item.id) {
            console.log(item.id, qty);
              return {...product, qty: qty + 1}
          }else {
            return product
          }
        })
        console.log(newCart);
        setCart(newCart)
        }
    }
    useEffect(() => {
     const sumTotal = cart.reduce((total, prod) => {
        return total + (prod.qty * prod.price)
     },0)
    }, [cart])
  


    useEffect(() => {
      subTotal()
    }, [qty])

  return (
    <div className={styles.cart_item}>
      <GiCancel
        className={styles.cancel_icon}
        onClick={() => deleteFromCart(item.id)}
      />
      <div className={styles.item_info}>
        <div className={styles.img_container}>
          <img src={item.img} alt="" />
        </div>
        <div className={styles.item_desc}>
          <p className={styles.item_title}>{item.name}</p>
          <p className={styles.item_price}>{'\u20A6'}{getNumberWithCommas(item.price)}<span className={styles.size}>{item.size}</span></p>
        </div>
      </div>
      <div className={styles.stock}>
        <div className={styles.stock_qty}>
          <button
            onClick={dec}
            style={{ background: `${qty <= 1 ? "#d3d3d3" : ""}` }}
          >
            -
          </button>
          <div>{qty}</div>
          <button
            onClick={() => inc(item.stock)}
            style={{ background: `${qty >= item.stock ? "#d3d3d3" : ""}` }}
          >
            +
          </button>
        </div>
        <p className={styles.subtotal}>{'\u20A6'}{getNumberWithCommas(sumTotal)}</p>
      </div>
    </div>
  );
}

export default SingleItem;
