import toast from 'react-hot-toast'

import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../../../context/GlobalState'
import { LOGGED_USER } from '../../../context/AppConstants'

import * as authService from '../../../services/authService'

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalContext)

    useEffect(() => {
        const tokenJSON = window.localStorage.getItem('token')
        const tokenParse = JSON.parse(tokenJSON)
        if (tokenParse) {
            navigate('/home')
        } 
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await authService.signIn(user)
            dispatch({
                type: LOGGED_USER,
                payload: true
            })
            window.localStorage.setItem('token', JSON.stringify(res))
            navigate('/home')
        } catch (error) {
            toast.error('Error al iniciar sesión.', {
                position: 'top-center',
                duration: 5000
            })
            handleCancel()
        }
    }

    const handleCancel = () => {
        setUser({ email: '', password: '' })
    }

    return (
        <div className="container p-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <div className="card p-2">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <legend className="text-center mb-3 fw-bold">Iniciar Sesión</legend>
                                <div className="mb-3">
                                    <input type="email" className="form-control" placeholder="Correo electrónico" value={user.email} onChange={({target}) => setUser({...user, email: target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" placeholder="Contraseña" value={user.password} onChange={({target}) => setUser({...user, password: target.value})}/>
                                </div>
                                
                                <p className='text-center fw-bold my-4'>¿No tienes una cuenta registrada?</p>

                                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login