import React, {useEffect, useState} from 'react'
import axios from 'axios'
import styles from '../styles/Event.module.css'
import { RotateSpinner } from 'react-spinners-kit'
import Link from 'next/link'


function events({eventsInfo}) {

    // const [eventsInfo, setEventsInfo] = useState([])
    const [upcomingEvent, setUpcomingEvent] = useState([]);
    const [pastEvent, setPastEvent] = useState([]);
    const [value, setValue] = useState(0)
    const [allEvents, setAllEvents] = useState([])
    // const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    // console.log(eventsInfo);

    // useEffect(() => {
    //     axios.get('https://thecarportal.herokuapp.com/events/')
    //     .then(res=>{
    //         setEventsInfo(res.data.message)
    //         console.log(res.data.message);
    //         setLoading(false)
    //     }).catch(err=> {
    //         console.log(err.response);
    //         setLoading(false)
    //         setError(err.response)
    //     })

    // }, [])
    useEffect(() => {
        console.log(eventsInfo);
        let upcoming = eventsInfo.filter(ev => ev.Status === "U")
        let past = eventsInfo.filter(ev => ev.Status === "P")
        setUpcomingEvent(upcoming)
        setPastEvent(past)
        setAllEvents([...upcoming])
    }, [])
    // console.log(allEvents)

    // ###


    // if(loading){
    //     return <div className="loading"><RotateSpinner size={50} color={'cyan'}/> </div>
    // }
    // if(error){
    //     return <h2>{error}</h2>
    // }
    // console.log(upcomingEvent);
    // console.log(pastEvent); 

    const upcomingFn = () => {
        setAllEvents(upcomingEvent)
        setValue(0)
    }

    const pastFn = () => {
        setAllEvents(pastEvent)
        setValue(1)
    }
    // if (loading) {
    //     return (
    //         <h2>Loading...</h2>
    //     )
    // }

    return (
        <>
        <div className={styles.tabs}>
            <div className={styles.title}>
                <h2>Events</h2>
                <div className={styles.outline}></div>
            </div>
            <main className={styles.event}>
                <section className={styles.btn_container}>
                    <div className={`${styles.btn} ${value === 0 ? styles.active : ''}`} onClick={upcomingFn}>Upcoming Events</div>
                    <div className={`${styles.btn} ${value === 1 ? styles.active : ''}`} onClick={pastFn}>Past Events</div>
                </section>
                <section className={`${styles.main_content} ${styles.event_list}`}>
                    {
                        allEvents?.length === 0 ?
                        <h2>Oops, No Events Here!</h2> :
                        allEvents.map((ev, i) => {
                            return (
                                <div className={styles.single_event} key={i}>
                                    <h2>{ev.Title}</h2>
                                    <p>{ev.Venue}</p>
                                    <p><i>{ev.Date}</i></p>
                                    <div className={styles.link_btn}>
                                        <Link href={`/events/${ev.id}`}>View More</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
            </main>
        </div>
        </>
    )

}

export const getServerSideProps = async (pageContext) => {
        let data = await axios.get('https://thecarportal.herokuapp.com/events/')
        let eventsInfo = await data.data.message
    return {
        props: {
            eventsInfo
        }
    }
}

export default events
