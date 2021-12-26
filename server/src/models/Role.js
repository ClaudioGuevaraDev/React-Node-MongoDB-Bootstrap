import mongoose from 'mongoose'

const { Schema, model } = mongoose

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const Role = model('Role', roleSchema)

export default Role