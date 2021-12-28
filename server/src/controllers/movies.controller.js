import fs from 'fs'
import path from 'path'

import Movie from '../models/Movie'

export const createMovie = async (req, res) => {
    const { title, description } = req.body

    if (title.length > 25) return res.status(400).json({ message: 'El título de la película es muy largo.' })

    if (description.length > 160) return res.status(400).json({ message: 'La descripción de la película es muy largo.' })

    const newMovie = new Movie(req.body)

    const savedMovie = await newMovie.save()    

    res.status(201).json(savedMovie)
}

export const uploadImageMovie = async (req, res) => {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { image: req.file.filename }, { new: true })

    res.json(updatedMovie)
}

export const getAllMovies = async (req, res) => {
    const movies = await Movie.find({})

    res.json(movies)
}

export const deleteMovie = async (req, res) => {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id)

    if (deletedMovie) return res.status(404).json({ message: 'Movie not found.' })

    const imageURL = path.join(__dirname, `../images/${deletedMovie.image}`)
    fs.unlinkSync(imageURL)

    res.json(deletedMovie)
}

export const getOneMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).json({ message: 'Movie not found.' })
    res.json(movie)
}

export const updateMovie = async (req, res) => {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found.' })
    res.json(updatedMovie)
}

export const updateImageMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    const imageURL = path.join(__dirname, `../images/${movie.image}`)
    fs.unlinkSync(imageURL)

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { image: req.file.filename }, { new: true })

    res.json(updatedMovie)
}