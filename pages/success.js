import React, {useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Success.module.css'
import { FaCheck } from 'react-icons/fa'
import { BsArrowBarLeft } from 'react-icons/bs'
import { cartContext } from '../utils/CartContext'
import axios from 'axios'
import Cookies from 'js-cookie'


function Success() {

    // const [cart, setCart] = useContext(cartContext)
    const router = useRouter()
    const {transaction_id} = router.query

    const [loading, setLoading] = useState(false)
    const [cartData, setCartData] = useState('')

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cartItem'))
            const sumTotal = cart.reduce((total, prod) => {
                return total + (prod.total)
             },0)
        // console.log(transaction_id)
        const cartData = cart.map((item, i) => {
            return(
                {
                    id: item.mainId,
                    quantity: item.qty,
                    price: item.price,
                    size: item.size
                }
            )
        })

        const finalData = {
            cart_items: cartData,
            trans_id: transaction_id,
            cart_price: sumTotal,           
        }

        const token = localStorage.getItem('carToken')
        let config = {
            headers : {
                Authorization: `Bearer ${token}`,
                "content-type":"application/json"
            }
        }

        // fetch("https://thecarportal.herokuapp.com/cart/", {
        //     method: "post",
        //     body: finalData,
        //     headers: config
        // })
        // .then(res => {
        //     res.json()
        // })
        // .then(data => {
        //     console.log(data);
        // })

        axios.post("https://thecarportal.herokuapp.com/cart/", finalData, config)
        .then(response => {
            console.log(response)
        })
    }, [])

        
        return (
            <div className={styles.success_body}>
                <div className={styles.success_card}>
                    <div className={styles.icon}>
                        <FaCheck style={{color: 'white', fontSize: '50px'}}/>
                    </div>
                    <h2 className={styles.success_tag}>SUCCESS</h2>
                    <p>Your Payment was successful, we would be in touch shortly. Thank you for your patronage</p>
                    <Link href="/stores">
                        <a>
                          <BsArrowBarLeft style={{fontSize: '30px'}}/>  Back to store
                        </a>
                    </Link>
                </div>
            </div>
        )

    // return (
    //         <div className={styles.success_body}>
    //             <div className={styles.success_card}>
    //                 <div className={styles.icon}>
    //                     <FaCheck style={{color: 'white', fontSize: '50px'}}/>
    //                 </div>
    //                 <h2 className={styles.success_tag}>ERROR</h2>
    //                 <p>Error in payment, please Try again.</p>
    //                 <Link href="/stores">
    //                     <a>
    //                       <BsArrowBarLeft style={{fontSize: '30px'}}/>  Back to store
    //                     </a>
    //                 </Link>
    //             </div>
    //         </div>
    // )
}

export default Success
