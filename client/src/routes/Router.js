import { useState, useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'
import { LOGGED_USER } from '../context/AppConstants'

import ProtectedRoutes from './ProtectedRoutes'

import Login from '../pages/auth/Login/Login'
import Home from '../pages/home/Home'

const Router = () => {
    const [loading, setLoading] = useState(true)
    const { dispatch } = useContext(GlobalContext)

    useEffect(() => {
        const tokenJSON = window.localStorage.getItem('token')
        const tokenParse = JSON.parse(tokenJSON)
        if (tokenParse) {
            dispatch({
                type: LOGGED_USER,
                payload: true
            })
        } else {
            dispatch({
                type: LOGGED_USER,
                payload: false
            })
        }
        setLoading(false)
    }, [])

    return (
        <>
        {loading ? (
            ''
        ) : (
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/home' element={<Home/>}/>
                </Route>
            </Routes>
        )}
        </>
    )
}

export default Router