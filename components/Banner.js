import React from 'react'
import styles from '../styles/Banner.module.css'

function Banner({bannerInfo}) {
    return (
        <div className={styles.banner_container} style={{background: `${bannerInfo.bg}`}}>
            <h2 style={{color: `${bannerInfo.text}`}}>{bannerInfo.text}</h2>
        </div>
    )
}

export default Banner
