import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const logged = false
    
    return (
        logged ? <Outlet/> : <Navigate to='/'/>
    )
}

export default ProtectedRoutes