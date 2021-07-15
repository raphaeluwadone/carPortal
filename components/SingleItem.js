import React, { useState, useContext } from "react";
import { GiCancel } from "react-icons/gi"
import styles from '../styles/Cart.module.css'
import { cartContext } from '../utils/cartContext'

function SingleItem({item, deleteFromCart}) {

    const subTotal = () => {
        let price = item.price.toString()
        const char = price.split('')
        // price = price.slice(1, price.length)
        const firstChar = char.shift()
        // let intVal = parseInt(price, 10)
        console.log(price);
    }


    const [qty, setQty] = useState(1)
    const [sumTotal, setSumTotal] = useState(item.price)

    const dec = () => {
        if (qty <= 1) {
            return
        }
        if (qty > 1) {
            setQty(qty - 1)
            return
        }
    }

    const inc = (stock) => {
        if (qty >= stock) {
            return
        }if (qty < stock) {
            setQty(qty + 1)
            return
        }
    }

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
          <p className={styles.item_price}>{item.price}</p>
        </div>
      </div>
      <div className={styles.stock}>
        <div className={styles.stock_qty}>
          <button
            onClick={dec}
            style={{ background: `${qty <= 1 ? "grey" : ""}` }}
          >
            -
          </button>
          <div>{qty}</div>
          <button
            onClick={() => inc(item.stock)}
            style={{ background: `${qty >= item.stock ? "grey" : ""}` }}
          >
            +
          </button>
        </div>
        <p className={styles.subtotal} onClick={subTotal}>{sumTotal}</p>
      </div>
    </div>
  );
}

export default SingleItem;
