import React, {useContext, useEffect } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import {userContext} from '../utils/userContext' 
import { GiMailShirt } from 'react-icons/gi';
import Cookies from 'js-cookie'

export default function App({sumTotal}) {

    const [userData, setUserData] = useContext(userContext)

    const user_data =  JSON.parse(localStorage.getItem('carPortalUser'))
    console.log(user_data.email);
   const config = {
    public_key: 'FLWPUBK-87d1183b60860c570373c9f8157cf3cf-X',
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
      logo: 'https://res.cloudinary.com/rafael-uwadone/image/upload/v1626600376/car-portal/5_kflre8.png',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Checkout',
    callback: (response) => {
      const data = response.json()
      if (data.status === 'success') {
        
      }
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