import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

const ProtectedRoutes = () => {
    const { state } = useContext(GlobalContext)

    const { logged } = state

    return (
        logged ? <Outlet/> : <Navigate to='/'/>
    )
}

export default ProtectedRoutes