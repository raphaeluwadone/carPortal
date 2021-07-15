import React, { useEffect } from 'react'
import styles from '../../styles/SingleEvent.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

function SingleEvent({data}) {
    const photos = data.message.Image
const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    dotsClass: "button__bar",
    className: 'slide',
    arrows: true
}
    useEffect(() => {
        console.log(data)
    }, [])
    return (
        <div className={styles.tabs}>
                    <div className={styles.single_title}>
                        <h2 className={styles.title}>vee</h2>
                    </div>
                    <main className={styles.event}>
                <section className={styles.main_content}>
                    <div className={styles.lead}>
                        <div className={styles.time}>
                            <h5><span>Date: </span></h5>
                            <h5><span>Venue: </span></h5>
                            <p><span>Time: </span></p>
                        </div>
                    </div>
                    <div className={styles.carousel}>
                        <Slider {...settings}>
                            {
                                photos.map((photo, i) => {
                                    return(
                                        <img src={photo} alt={photo} key={i} width='70px'/>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <p className={styles.desc}>

                    </p>
                    <div className={styles.video}>
        
                    </div>
                </section>
            </main>
                </div>
            )
}
    

export const getServerSideProps = async ({params}) =>{
    const id = params.eventId

    let response = await fetch(
        `http://thecarportal.herokuapp.com/events/get/${id}`
    );
    let data = await response.json();
    return {
        props: {
            data
        }
    }
}

export default SingleEvent
