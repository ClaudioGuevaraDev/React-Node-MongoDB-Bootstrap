import axios from 'axios'

const baseURL = 'http://localhost:4000/api/movies'

export const createMovie = async ({ title, description }) => {
    const { data } = await axios.post(baseURL, { title, description })
    return data
}

export const uploadImageMovie = async (id, formData) => {
    return await axios.put(`${baseURL}/upload-image/${id}`, formData)
}