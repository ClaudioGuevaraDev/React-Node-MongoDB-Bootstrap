import { createContext, useReducer } from 'react'

import AppReducer from './AppReducer'

const initialState = {
    logged: false,
    username: '',
    role: ''
}

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}