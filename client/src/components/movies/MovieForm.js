import { useState } from 'react'

import Navbar from "../Navbar/Navbar"

import * as movieService from '../../services/movieService'

const MovieForm = () => {
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        file: null
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('image', movie.file)

        try {
            const res = await movieService.createMovie({
                title: movie.title,
                description: movie.description
            })
            const { _id } = res
            if (res) {
                try {
                    await movieService.uploadImageMovie(_id, formData)
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {   
            console.log(error)
        }

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
            <div className="container p-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="card-title h4 text-center">Agregar una nueva película</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Título" autoFocus value={movie.title} onChange={({target}) => setMovie({...movie, title: target.value})} required/>
                                    </div>
                                    <div className="mb-3">
                                        <textarea placeholder="Descripción" rows={4} className="form-control" value={movie.description} onChange={({target}) => setMovie({...movie, description: target.value})} required/>
                                    </div>
                                    <div className="mb-3">
                                        <input id='file-input' type="file" className="form-control" onChange={({target}) => setMovie({...movie, file: target.files[0]})} required/>
                                    </div>
                                    <div className="hstack gap-3">
                                        <button className="btn btn-primary w-50" type='submit'>Crear</button>
                                        <button type='button' className="btn btn-danger w-50" onClick={handleCancel}>Cancelar</button>
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

export default MovieForm