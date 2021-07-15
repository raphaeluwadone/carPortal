import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../utils/userContext";
import { cartContext } from "../utils/cartContext"
import styles from "../styles/Store.module.css";
import Router from "next/router";
import Banner from "../components/Banner";
import Link from 'next/link'
import Cart from "../components/Cart";
import { TiShoppingCart } from "react-icons/ti"
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';

function stores() {
  const [salute, setSalute] = useState(false);
  const [storeData, setStoreData] = useState([])
  const [bannerInfo, setBannerInfo] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useContext(userContext);
  const [cart, setCart] = useState();

  const hideShow = () => {
    setShowCart(false)
  }

  useEffect(() => {
    const getStoreData = async () => {
      setLoading(true)
      try {
        const token = Cookies.get("carToken")
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        let response = await fetch(
          "http://thecarportal.herokuapp.com/store/merch/",
          config
        );
        let storeData = await response.json();
        console.log(storeData);  
        localStorage.setItem('storeData', JSON.stringify(storeData.message))
        setStoreData(storeData.message)  
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    getStoreData()
    let cartContent = JSON.parse(localStorage.getItem('carPortalCart')) ? JSON.parse(localStorage.getItem('carPortalCart')) : []
    setCart(cartContent)
  }, []);

  const addToCart = (img, name, stock, price) => {
    let currentCart = JSON.parse(localStorage.getItem('carPortalCart')) ? JSON.parse(localStorage.getItem('carPortalCart')) : []
    const newCart = [...currentCart, 
        {
         img,
         stock,
         id: uuidv4(),
         name,
         price
        }
    ]
    localStorage.setItem('carPortalCart', JSON.stringify(newCart))
    setCart(newCart)
}

  // useEffect(() => {
  //   console.log(userData);
  //   setTimeout(() => {
  //     setSalute(false);
  //   }, 3000);
  // }, [salute]);

  // if (data.status_code !== 200) {
  //   return salute && <Banner bannerInfo={bannerInfo} />;
  // }
  useEffect(() => {
    console.log(storeData)
    console.log(cart);
  }, [storeData])

  if (loading) {
    return <h2>Loading data...</h2>
  }

  return (
    <>
    {storeData ? <p>We have Data</p> : <p>No Data</p>}
    {showCart && <Cart hideShow={hideShow}/> }
      <div className={styles.tabs}>
      <div className="cart_container" style={{top: '150px'}}>
            {cart?.length > 0 && <div className="cart_content"></div>}
            <TiShoppingCart className='cart_icon' onClick={()=>setShowCart(true)} style={{cursor: "pointer"}}/>
        </div>
        <div className={styles.title}>
          <h2>Stores</h2>
          <div className={styles.outline}></div>
        </div>
        <main className={styles.store}>
          <section className={styles.btn_container}>
            <div
              className={`${styles.btn}`}
            >
              Merch
            </div>
            <div
              className={`${styles.btn}`}
            >
              Auto
            </div>
          </section>
          <section className={`${styles.main_content} ${styles.store_list}`}>
            {storeData ? (
              storeData.map((item, i) => {
                return (
                  <div className={styles.single_store} key={i}>
                    <h2>{item.name}</h2>
                    <div className={styles.single_content}>
                        <img src={item.images[0]} alt=""/>
                        <div className={styles.price_content}>
                            <p className={styles.new_price}>{item.new_price}</p>
                            <div className={styles.discount}>
                                <p className={styles.old_price}>{item.old_price}</p>
                                <p className={styles.perc}>{item.discount}</p>
                            </div>
                        </div>
                        <Link href={`/stores/merch/${item.id}`}>
                          <p className={styles.item_desc}>{item.description}</p>
                        </Link>
                        </div> 
                    <div className={styles.btn_cart_container}>
                      <div className={styles.link_btn}>
                        <Link href={`/stores/merch/${item.id}`}>View More</Link>
                      </div>
                      <button className={styles.add_btn} onClick={() => addToCart(item.images[0], item.name, item.stock,  item.new_price)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>Store Empty</h2>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

// export const getServerSideProps = async ({ req }) => {
//   const token = req?.cookies.carToken;
//   let config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   let response = await fetch(
//     "http://thecarportal.herokuapp.com/store/merch/",
//     config
//   );
//   let data = await response.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

export default stores;
