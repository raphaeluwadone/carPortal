import React, {useContext, useEffect } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import {userContext} from '../utils/userContext' 
import { GiMailShirt } from 'react-icons/gi';
import Cookies from 'js-cookie'

export default function App({sumTotal}) {

    const [userData, setUserData] = useContext(userContext)

    const user_data =  JSON.parse(localStorage.getItem('carPortalUser'))
    // const user = Cookies.get('carPortalUser')
    console.log(user_data.email);
   const config = {
    public_key: 'FLWPUBK-9aa80318f2a5750a13adec6941c6771c-X',
    tx_ref: Date.now(),
    amount: sumTotal,
    currency: 'NGN',
    redirect_url: 'localhost:3000/success',
    payment_options: 'card',
    customer: {
      email: user_data.email,
      phonenumber: user_data.phone,
      name: user_data.username,
    },
    customizations: {
      title: 'CarPortal Checkout',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Checkout',
    callback: (response) => {
       console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="payment">
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}