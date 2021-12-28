import { useState, useEffect } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import * as movieService from '../../services/movieService'

const MovieList = () => {
    const [movies, setMovies] = useState([])

    const getMovies = async () => {
        const tokenJSON = window.localStorage.getItem('token')
        const tokenParse = JSON.parse(tokenJSON)
        const data = await movieService.getAllMovies(tokenParse)
        setMovies(data)
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div className="container p-4">
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
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 text-center">
                {movies.map((movie) => (
                    <div className="col" key={movie._id}>
                        <div className="card" style={{minHeight:"420px"}}>
                            <img src={`http://localhost:4000/${movie.image}`} className="img-fluid h-100 rounded-start" className="card-img-top img-fluid"/>
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title fw-bold">{movie.title}</h5>
                                <p className="card-text fst-italic">
                                    {movie.description}
                                </p>
                                <div className="d-flex justify-content-around">
                                    <button className="btn btn-outline-warning fw-bold btn-sm">EDITAR</button>
                                    <button className="btn btn-outline-danger fw-bold btn-sm">ELIMINAR</button>
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