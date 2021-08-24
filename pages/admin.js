import React, { useEffect } from 'react'
import { RotateSpinner } from 'react-spinners-kit'

function Admin() {

    useEffect(() => {
        document.location.href = "https://thecarportal.herokuapp.com/admin"
    }, [])

    return (
        <div className="admin__body">
            <div className="admin__content">
            <h2>Redirecting To Admin Dashboard...</h2>
            <RotateSpinner size={40} color={'#fff'}/>
            </div>
        </div>
    )
}

export default Admin
