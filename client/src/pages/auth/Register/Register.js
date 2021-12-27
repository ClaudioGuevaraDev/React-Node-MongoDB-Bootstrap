import './register.css'

import toast from 'react-hot-toast'

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as authService from '../../../services/authService'

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        repeatedPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const tokenJSON = window.localStorage.getItem('token')
        const tokenParse = JSON.parse(tokenJSON)
        if (tokenParse) navigate('/home')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (user.password !== user.repeatedPassword) {
            toast.error('Las contraseñas no coinciden.', {
                position: 'top-center',
                duration: 5000
            })
            handleCancel()
        } else {
            const { username, email, password } = user
            try {
                const res = await authService.signUp({ username, email, password })
                if (res) {
                    navigate('/')
                }
            } catch (error) {
                toast.error('Error al registrarse. El usuario ya existe.', {
                    position: 'top-center',
                    duration: 5000
                })
            }
            handleCancel()
        }
        setLoading(false)
    }

    const handleCancel = () => {
        setUser({
            username: '',
            email: '',
            password: '',
            repeatedPassword: ''
        })
    }

    return (
        <div className="container p-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <div className="card p-2">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <legend className="text-center mb-3 fw-bold">Crearse una cuenta</legend>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre de usuario" value={user.username} onChange={({target}) => setUser({...user, username: target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" placeholder="Email" value={user.email} onChange={({target}) => setUser({...user, email: target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" placeholder="Contraseña" value={user.password} onChange={({target}) => setUser({...user, password: target.value})}/> 
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" placeholder="Repita la contraseña" value={user.repeatedPassword} onChange={({target}) => setUser({...user, repeatedPassword: target.value})}/>
                                </div>
                                <Link to='/' className='link'>
                                    <p className='text-white text-center fw-bold my-4'>¿Ya tienes una cuenta registrada?</p>
                                </Link>
                                {loading ? (
                                    <button className='btn btn-primary w-100' disabled>
                                        <span className='spinner-border spinner-border-sm' role="status" aria-hidden="true"></span>
                                        <span className='visually-hidden'>Cargando...</span>
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-100">Registrarse</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register