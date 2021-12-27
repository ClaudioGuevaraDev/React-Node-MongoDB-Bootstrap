import { useState, useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'
import { LOGGED_USER } from '../context/AppConstants'

import ProtectedRoutes from './ProtectedRoutes'

import Login from '../pages/auth/Login/Login'
import Home from '../pages/home/Home'
import Register from '../pages/auth/Register/Register'

import toast from 'react-hot-toast'

import * as authService from '../services/authService'

const Router = () => {
    const [loading, setLoading] = useState(true)
    const { dispatch } = useContext(GlobalContext)

    const verifySession = async (tokenParse) => {
        try {
            await authService.validateToken(tokenParse)
        } catch (error) {
            toast.error('Sesión terminada. Vuelva a iniciar sesión.', {
                position: 'top-center',
                duration: 5000
            })
            dispatch({
                type: LOGGED_USER,
                payload: false
            })
            window.localStorage.removeItem('token')
        }
    }

    useEffect(() => {
        setLoading(true)
        const tokenJSON = window.localStorage.getItem('token')
        const tokenParse = JSON.parse(tokenJSON)
        if (tokenParse) {
            verifySession(tokenParse)
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
                <Route path='/register' element={<Register/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/home' element={<Home/>}/>
                </Route>
            </Routes>
        )}
        </>
    )
}

export default Router