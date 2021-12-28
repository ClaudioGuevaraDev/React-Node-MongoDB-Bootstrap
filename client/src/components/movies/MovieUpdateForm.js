import toast from 'react-hot-toast'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'

import * as movieService from '../../services/movieService'

const MovieUpdateForm = () => {
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        file: null
    })
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const getMovie = async () => {
        const tokenJSON = window.localStorage.getItem('token')
        const tokenParse = JSON.parse(tokenJSON)
        const res = await movieService.getOneMovie(id, tokenParse)
        setMovie(res)
    }

    useEffect(() => {
        getMovie()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const tokenJSON = window.localStorage.getItem('token')
        const tokenParse = JSON.parse(tokenJSON)
        setLoading(true)
        console.log(movie.file)
        if (movie.file !== undefined) {
            console.log("Hola")
            if (movie.file.type !== "image/jpg" && movie.file.type !== "image/png" && movie.file.type !== "image/jpeg") {
                toast.error('Solo se permiten imágenes jpg, jpeg y png.', {
                    position: 'top-center',
                    duration: 5000
                })
                handleCancel()
                return
            }   
        }

        try {
            const data = {
                title: movie.title,
                description: movie.description
            }
            const res = await movieService.updateMovie(id, data, tokenParse)
            console.log(res)
            if (res && movie.file !== undefined) {
                try {
                    const formData = new FormData()
                    formData.append('image', movie.file)
                    await movieService.updateImageMovie(id, formData, tokenParse) 
                    toast.success('Película actualizada.', {
                        position: 'top-center',
                        duration: 5000
                    })
                } catch (error) {
                    toast.error('Error al actualizar la imagen de la película.', {
                        position: 'top-center',
                        duration: 5000
                    })
                }
            } else {
                toast.success('Película actualizada. La imagen se mantuvo.', {
                    position: 'top-center',
                    duration: 5000
                })
                handleCancel()
            }
        } catch (error) {
            toast.error('Error al actualizar la imagen', {
                position: 'top-center',
                duration: 5000
            })
        }
        setLoading(false)
        handleCancel()
    }

    const handleCancel = () => {
        setMovie({
            title: '',
            description: '',
            file: null
        })
        document.getElementById('file-input').value = null
    }

    return (
        <div>
            <Navbar/>
            <div className='container p-4'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4 className='card-title text-center'>Actualizar la película</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <input type='text' placeholder='Título' className='form-control' autoFocus value={movie.title} onChange={({target}) => setMovie({...movie, title: target.value})}/>
                                    </div>
                                    <div className='mb-3'>
                                        <textarea placeholder='Descripción' className='form-control' rows={4} value={movie.description} onChange={({target}) => setMovie({...movie, description: target.value})}/>
                                    </div>
                                    <div className='mb-3'>
                                        <input id='file-input' type="file" className="form-control" onChange={({target}) => setMovie({...movie, file: target.files[0]})}/>
                                    </div>
                                    <div className='hstack gap-3'>
                                        {loading ? (
                                            <button className='btn btn-primary w-100' disabled>
                                                <span className='spinner-border spinner-border-sm' role="status" aria-hidden="true"></span>
                                                <span className='visually-hidden'>Cargando...</span>
                                            </button>
                                        ) : (
                                            <button type='submit' className='btn btn-primary w-50'>Editar</button>
                                        )}
                                        <button type='button' className='btn btn-danger w-50' onClick={handleCancel}>Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieUpdateForm