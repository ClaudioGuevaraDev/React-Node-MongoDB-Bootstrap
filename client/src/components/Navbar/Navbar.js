import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { Modal } from 'react-bootstrap'

import { GlobalContext } from '../../context/GlobalState' 
import { LOGGED_USER } from '../../context/AppConstants'

const Navbar = () => {
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const { dispatch } = useContext(GlobalContext)

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    const logout = () => {
        setLoading(true)
        window.localStorage.removeItem('token')
        dispatch({
            type: LOGGED_USER,
            payload: false
        })
        navigate('/')
        setLoading(false)
        handleCloseModal()
    }

    return (
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
           <div className="container">
               <h3 className="h4"><span className="fw-bold">Bienvenido: </span></h3>
               <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="btn btn-danger fw-bold" onClick={handleOpenModal}>CERRAR SESIÓN</a>
                        </li>
                    </ul>
               </div>
           </div>
           <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Cerrar Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="fw-bold">¿Estás seguro de cerrar la sesión?</p>
                </Modal.Body>
                <Modal.Footer>
                    {loading ? (
                        <button type="button" className='btn btn-primary' disabled>
                            <span className='spinner-border spinner-border-sm' role="status" aria-hidden="true"></span>
                            <span className='visually-hidden'>Cargando...</span>
                        </button>
                    ) : (
                        <button type='button' className='btn btn-primary' onClick={logout}>CERRAR SESIÓN</button>
                    )}
                    <button type='button' className='btn btn-danger' onClick={handleCloseModal}>CANCELAR</button>
                </Modal.Footer>
           </Modal>
       </nav>
    )
}

export default Navbar