import './login.css'

import toast from 'react-hot-toast'
import jwt_decode from 'jwt-decode'

import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { GlobalContext } from '../../../context/GlobalState'
import { LOGGED_USER } from '../../../context/AppConstants'

import * as authService from '../../../services/authService'

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        try {
            const { token } = await authService.signIn(user)
            const decodedToken = jwt_decode(token)
            const { username, role } = decodedToken
            dispatch({
                type: LOGGED_USER,
                payload: {
                    logged: true,
                    username: username,
                    role: role
                }
            })
            window.localStorage.setItem('token', JSON.stringify(token))
            navigate('/home')
        } catch (error) {
            toast.error('Error al iniciar sesión.', {
                position: 'top-center',
                duration: 5000
            })
            handleCancel()
        }
        setLoading(false)
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
                                
                                <Link to='/register' className='link'>
                                    <p className='text-white text-center fw-bold my-4'>¿No tienes una cuenta registrada?</p>
                                </Link>

                                {loading ? (
                                    <button className='btn btn-primary w-100' disabled>
                                        <span className='spinner-border spinner-border-sm' role="status" aria-hidden="true"></span>
                                        <span className='visually-hidden'>Cargando...</span>
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login