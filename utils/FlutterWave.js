import React, {useContext, useEffect } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import {userContext} from '../utils/userContext' 
import { GiMailShirt } from 'react-icons/gi';

export default function App({sumTotal}) {

    const [userData, setUserData] = useContext(userContext)

    const user_data =  JSON.parse(localStorage.getItem('carPortalUser'))
    console.log(process.env.PRIMARY_KEY_FLUTTERWAVE);
    let userName = user_data['name']
    console.log(userName);
   const config = {
    public_key: 'FLWPUBK-9aa80318f2a5750a13adec6941c6771c-X',
    tx_ref: Date.now(),
    amount: '100',
    currency: 'NGN',
    redirect_url: 'localhost:3000/success',
    payment_options: 'card',
    customer: {
      email: 'raphaeluwadone@gmail.com',
      phonenumber: '08163473249',
      name: 'Raphael',
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