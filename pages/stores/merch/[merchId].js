import React, { useEffect, useContext, useState } from 'react'
import styles from '../../../styles/Merch.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { TiShoppingCart } from "react-icons/ti"
import { cartContext } from '../../../utils/cartContext'
import Cart from '../../../components/Cart';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';


function singleMerch() {

    const router = useRouter()
    const { merchId } = router.query

    const [cart, setCart] = useState()
    const [showCart, setShowCart] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState(merchId)

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('storeData'))
        let newId = merchId ? merchId : localStorage.getItem('itemId')
        localStorage.setItem('itemId', newId)
        const item = data.find(el => el.id == newId)
        console.log(item);
        setItem(item);
        setCart(JSON.parse(localStorage.getItem('carPortalCart')))
        setLoading(false)
        console.log(cart);
    }, [])

    useEffect(() => {
        const cartState = setInterval(() => {
           const currentCart = JSON.parse(localStorage.getItem('carPortalCart'))
           let cartContained = currentCart.length > 1 ? true : false
           setInCart(cartContained)
            return () => {
                clearInterval(cartState)
            }
        }, 5000);
    }, [])

    
    const addToCart = () => {
        let currentCart = JSON.parse(localStorage.getItem('carPortalCart')) ? JSON.parse(localStorage.getItem('carPortalCart')) : []
        const newCart = [...currentCart, 
            {
             img: item.images[0],
             stock: item.stock,
             id: uuidv4(),
             name: item.name,
             price: item.new_price
            }
        ]
        localStorage.setItem('carPortalCart', JSON.stringify(newCart))
        setCart(newCart)
    }

    const hideShow = () => {
        setShowCart(false)
      }


    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        arrows: false,
        dotsClass: "button__dot",
        className: 'slides'
    }

    
    // useEffect(() => {
    //     localStorage.getItem('storeData')

    //     console.log(data);
    // }, [])

    // useEffect(() => {
    //     console.log(cart);
    // }, [cart])
    if (!item) {
        return <p>Loading...</p>
    }

    return (
<main className={styles.merch_container}>
       {showCart && <Cart hideShow={hideShow}/>}
        <div className="cart_container">
        {inCart && <div className="cart_content"></div>}
            <TiShoppingCart className='cart_icon' onClick={()=>setShowCart(true)} style={{cursor: "pointer"}}/>
        </div>
        <div className={styles.main_section}>
            <div className={styles.main_info}>
                <div className={styles.img_container}>
                    <Slider {...settings}>
                        {
                            item.images.map((img, i) => {
                                return(
                                    <img src={img} alt={img} key={i}/>
                                )
                            })
                        }
                    </Slider>
                </div>
                <div className={styles.section_text}>
                    <h4 className={styles.section_head}>{item.name}</h4>
                    <div className={styles.section_price}>
                        <p className={styles.actual_price}>{item.new_price}</p>
                        <div className={styles.price_variation}>
                            <p>{item.old_price}</p>
                            <div className={styles.perc}>{item.discount}</div>
                        </div>
                        <div className={styles.variations}>
                        <p>Color Variation: {item.color_variation}</p>
                        </div>
                    </div>
                    <button className={styles.cart_btn} onClick={addToCart}>Add To Cart</button>
                </div>
            </div>
            <div className={styles.desc}>
                <h4>
                    Description: 
                </h4>
                <p>
                {item.description}
                </p>
            </div>
        </div>
        <div className={styles.billing_info}>
            <h4 className={styles.headline}>Delivery Info</h4>
            <p className={styles.billing_text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Unde vel aspernatur odit quis corrupti perferendis. 
                Sequi expedita magni atque error?
            </p>
            <div className={styles.delivery_locale}>
                <h2>Available Location</h2>
                <ul>
                    <li className={item.location === 'Lagos' ? styles.active : styles.inactive}>Lagos</li>
                    <li className={item.location === 'Ife' ? styles.active : styles.inactive}>Ife</li>
                    <li className={item.location === 'Ibadan' ? styles.active : styles.inactive}>Ibadan</li>
                </ul>
            </div>
            <div className={styles.time_policy}>
                <img src="" alt="" />
                <p><span>Time Duration: </span>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            </div>
            <div className={styles.return_policy}>
                <img src="" alt="" />
                <p><span>Return Policy: </span>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            </div>
        </div>
    </main>
    )
}

// export const getServerSideProps = async ({req, params}) =>{
//     const token = req?.cookies.carToken;
//     const id = params.merchId
//     let config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     let response = await fetch(
//         `http://thecarportal.herokuapp.com/store/merch/${id}`,
//       config
//     );
//     let data = await response.json();


//     return {
//         props: {
//             data
//         }
//     }
// }

export default singleMerch
