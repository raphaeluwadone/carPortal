import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../utils/userContext";
import { cartContext } from "../utils/CartContext"
import styles from "../styles/Store.module.css";
import Router from "next/router";
import Banner from "../components/Banner";
import Link from 'next/link'
import Cart from "../components/Cart";
import { TiShoppingCart } from "react-icons/ti"
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';
import { getNumberWithCommas } from '../utils/functions'
import AuthHOC from "../components/AuthHOC";
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import CartToast from '../components/CartToast'
import StoreItem from "../components/StoreItem";
import { RotateSpinner } from 'react-spinners-kit'


function Stores(props) {
  const [salute, setSalute] = useState(false);
  const [storedata, setStoreData] = useState(props.data)
  const [bannerInfo, setBannerInfo] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useContext(userContext);
  const [cart, setCart] = useContext(cartContext);
  const [user, setUser] = useState('')


  const hideShow = () => {
    setShowCart(false)
  }
  console.log(props);
  useEffect(() => {
    // setSalute(false)
  }, [salute]);

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
    setSalute(true)
}

  // useEffect(() => {
  //   console.log(userData);
  //   setTimeout(() => {
  //     setSalute(false);
  //   }, 3000);
  // }, [salute]);

  useEffect(() => {
    if (props.data?.status_code !== 200) {
      const reRoute = () => Router.replace('/login')
      reRoute()
    }
    const userInfo = JSON.parse(localStorage.getItem('carPortalUser'))
    const userName = userInfo.username
    setUser(userName)
  }, [])
  

  return (
    <>
      <Head>
        <title>CarPotal | Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {showCart && <Cart hideShow={hideShow}/> }
      <div className={styles.tabs}>
      <div className="cart_container" style={{top: '150px'}}>
          <p>{user}</p>
            {cart?.length > 0 && <div className="cart_content"></div>}
            <TiShoppingCart className='cart_icon' onClick={()=>setShowCart(true)} style={{cursor: "pointer", color: 'white'}}/>
        </div>
        <div className={styles.title}>
          <h2>Stores</h2>
          <div className={styles.outline}></div>
        </div>
        <main className={styles.store}>
          <section className={styles.btn_container}>
            <div
              className={`${styles.btn} ${styles.active}`}
            >
              Merch
            </div>
            {/* <div
              className={`${styles.btn}`}
            >
              Auto
            </div> */}
          </section>
          <section className={`${styles.main_content} ${styles.store_list}`}>
            {props.data.message ? (
              props.data.message.map((item, i) => {
                return (
                 <StoreItem item={item} key={i}/>
                );
              })
            ) : (
              <RotateSpinner size={40} color={'#0303aa'} loading={true} styles={{marginLeft: '200px'}}/> 
            )}
          </section>
        </main>
      </div>
    </>
  );
}

// Stores.getInitialProps = async (ctx) => {
//   const token = ctx.req.cookies.carToken;
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
//     data: data.message
//   };
// };


export default Stores;

export const getServerSideProps = async ({ req }) => {
  const token = req?.cookies.carToken;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await fetch(
      "http://thecarportal.herokuapp.com/store/merch/",
      config
    );

    let data = await response.json();
    return {
      props: {
        data
      }
    }
  } catch (error) {
    return {
      redirect: {
          destination: '/ErrorPage',
          permanent: false,
      }
    };
  }
};


