import jwt_decode from 'jwt-decode'

import { useState, useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'
import { LOGGED_USER } from '../context/AppConstants'

import ProtectedRoutes from './ProtectedRoutes'

import Login from '../pages/auth/Login/Login'
import Home from '../pages/home/Home'
import Register from '../pages/auth/Register/Register'
import MovieForm from '../components/movies/MovieForm'

import toast from 'react-hot-toast'

import * as authService from '../services/authService'

const Router = () => {
    const [loading, setLoading] = useState(true)
    const { dispatch } = useContext(GlobalContext)

    const verifySession = async (tokenParse) => {
        try {
            await authService.validateToken(tokenParse)
            const { username, role } = jwt_decode(tokenParse)
            dispatch({
                type: LOGGED_USER,
                payload: {
                    logged: true,
                    username: username,
                    role: role
                }
            })
        } catch (error) {
            toast.error('Sesión terminada. Vuelva a iniciar sesión.', {
                position: 'top-center',
                duration: 5000
            })
            dispatch({
                type: LOGGED_USER,
                payload: {
                    logged: false
                }
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
        } else {
            dispatch({
                type: LOGGED_USER,
                payload: {
                    logged: false
                }
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
                    <Route path='/add-movie' element={<MovieForm/>}/>
                </Route>
            </Routes>
        )}
        </>
    )
}

export default Router