import Movie from '../models/Movie'

export const createMovie = async (req, res) => {
    console.log(req.body)
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
