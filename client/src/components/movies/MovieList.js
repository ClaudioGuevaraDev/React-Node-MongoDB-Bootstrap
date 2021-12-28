import toast from 'react-hot-toast'

import { useState, useEffect, useContext } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import {GlobalContext} from '../../context/GlobalState'

import * as movieService from '../../services/movieService'

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [refresh, setRefresh] = useState(true)
    const { state } = useContext(GlobalContext)

    const { role } = state

    const getMovies = async () => {
        const tokenJSON = window.localStorage.getItem('token')
        const tokenParse = JSON.parse(tokenJSON)
        const data = await movieService.getAllMovies(tokenParse)
        setMovies(data)
    }

    useEffect(() => {
        getMovies()
    }, [refresh])

    const handleDeleteMovie = async (id) => {
        try {
            const tokenJSON = window.localStorage.getItem('token')
            const tokenParse = JSON.parse(tokenJSON)
            await movieService.deleteMovie(id, tokenParse)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
            toast.error('Error al eliminar la película.', {
                position: 'top-center',
                duration: 5000
            })
        }
    }

    return (
        <div className="container p-4">
            {role === "Admin" && (
                <div className="row">
                    <div className="col-md-3">
                        <Link to='/add-movie' className="btn btn-outline-success btn-sm">
                            <div className='row'>
                                <div className='d-flex align-items-center gap-2'>
                                    <i className='fs-4 d-flex align-items-center'><RiAddCircleFill/></i> 
                                    <span>AGREGAR PELÍCULA</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 text-center">
                {movies.map((movie) => (
                    <div className="col" key={movie._id}>
                        <div className="card" style={{minHeight:"420px"}}>
                            <img src={`http://localhost:4000/${movie.image}`} className="img-fluid rounded-start" className="card-img-top img-fluid"/>
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title fw-bold">{movie.title}</h5>
                                <p className="card-text fst-italic">
                                    {movie.description}
                                </p>
                                <div className="d-flex justify-content-around">
                                    {role === "Admin" && (
                                        <>
                                        <Link to={`/update-movie/${movie._id}`} className="btn btn-outline-warning fw-bold btn-sm">EDITAR</Link>
                                        <button className="btn btn-outline-danger fw-bold btn-sm" onClick={() => handleDeleteMovie(movie._id)}>ELIMINAR</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieList