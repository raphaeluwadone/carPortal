import React, { createContext, useState, useEffect } from 'react'

export const cartContext = createContext() 

export function CartProvider(props) {
    const [cart, setCart] = useState()

    return (
        <cartContext.Provider value={[cart, setCart]}>
            {props.children}
        </cartContext.Provider>
    )
}
