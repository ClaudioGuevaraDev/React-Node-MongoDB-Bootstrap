import { useState, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../../context/GlobalState' 
import { LOGGED_USER } from '../../context/AppConstants'

const Navbar = () => {
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const { state, dispatch } = useContext(GlobalContext)
    const { username, role } = state

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    const logout = () => {
        setLoading(true)
        window.localStorage.removeItem('token')
        dispatch({
            type: LOGGED_USER,
            payload: {
                logged: false
            }
        })
        setLoading(false)
        handleCloseModal()
    }

    return (
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
           <div className="container">
               <h3 className="h5"><span className="fw-bold">{username}</span></h3>
               <button type='button' className='navbar-toggler' data-bs-toggle="collapse" data-bs-target="#nav-menu" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                   <span className='navbar-toggler-icon'></span>
               </button>
               <div className="collapse navbar-collapse" id='nav-menu'>
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        <li className='nav-item'>
                            <Link className='nav-link' to="/home">Películas</Link>
                        </li>
                        <div className='mx-3'></div>
                        <li className="nav-item">
                            <a className="btn btn-danger btn-sm" onClick={handleOpenModal}>CERRAR SESIÓN</a>
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