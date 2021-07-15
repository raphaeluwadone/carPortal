
import React, {useState, useEffect, useContext} from "react";
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import axios from 'axios'
import Toast from "../components/Toast"
import { RotateSpinner } from 'react-spinners-kit'
import { userContext } from "../utils/userContext";
import Cookies from 'js-cookie'
import Router from 'next/router'

function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState({})

  const [userData, setUserData] = useContext(userContext)

  const userLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {email, password}
    axios.post('https://thecarportal.herokuapp.com/user/login/', data)
    .then(response => {
      console.log(response.data);
      setUserData(response.data)
      setLoading(false)
      setToastInfo({title: "Success!", msg: `Welcome ${email}`, bg: "#26a62e"})
      setShowToast(true)
      localStorage.setItem("carToken", response.data.token)
      let inHour = 1/24
      Cookies.set("carToken", response.data.token, {expires: inHour})
      Router.replace('/stores')
      setEmail('')
      setPassword('')
    })
    .catch(error => {
      console.log(error);
      console.log(error);
      setShowToast(true)
      setToastInfo({title: "Error!", msg: `${error.response.data.non_field_errors[0]}`, bg: "#df4759"})
      setLoading(false)
      setEmail('')
      setPassword('')
    });
  }
  
  console.log(userData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false)
    }, 5000);
    return () => {
      clearTimeout(timer)
    }
  }, [toastInfo])
  return (
    <>
      <section className={styles.login}>
        <div className={styles.imgBx}>
          <img src="https://res.cloudinary.com/rafael-uwadone/image/upload/v1624096399/car-portal/pexels-pixabay-326259_kpieq1.jpg" alt="ted" />
        
        </div>
        <div className={styles.contentBx}>
          <div className={styles.formBx}>
            <h2>Login</h2>
            <form action="">
              <div className={styles.inputBx}>
                <h5>Email</h5>
                <div className="i">
                  <i className="fas fa-at"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  className={styles.input}
                  autoComplete="off"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className={styles.inputBx}>
                <h5>Password</h5>
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  autoComplete="off"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>

              <div className={styles.inputBtn} onClick={userLogin}>
              {!loading ?
                 <input type="submit" value="Login" />
                 :
                 <div style={{margin:'50px'}}>
                   <RotateSpinner size={30} color={'#2fd03a'} loading={loading}/>
                 </div>
                }
              </div>
              <div className={styles.link}>
                <p>
                  Don't have an account yet? <Link href="/signup"><a>Sign up</a></Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {showToast && <Toast info={toastInfo}/>}
      </section>
    </>
  );
}

export default login;
