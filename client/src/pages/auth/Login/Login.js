import { useState } from 'react'

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleCancel = () => {
        setUser({ email: '', password: '' })
    }

    return (
        <div className="container p-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-3">
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-secondary w-100" onClick={handleCancel}>Cancelar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login