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
