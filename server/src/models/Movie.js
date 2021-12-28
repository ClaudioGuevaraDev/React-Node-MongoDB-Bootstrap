import mongoose from 'mongoose'

const { Schema, model } = mongoose

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 25
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 160
    },
    image: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const Movie = model('Movie', movieSchema)

export default Movie