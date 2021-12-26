import { Routes, Route } from 'react-router-dom'

import ProtectedRoutes from './ProtectedRoutes'

import Login from '../pages/auth/Login/Login'
import Home from '../pages/home/Home'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route element={<ProtectedRoutes/>}>
                <Route path='/home' element={<Home/>}/>
            </Route>
        </Routes>
    )
}

export default Router