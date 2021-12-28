import axios from 'axios'

const baseURL = 'http://localhost:4000/api/movies'

export const createMovie = async ({ title, description }, token) => {
    const { data } = await axios.post(baseURL, { title, description }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const uploadImageMovie = async (id, formData, token) => {
    return await axios.put(`${baseURL}/upload-image/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getAllMovies = async (token) => {
    const { data } = await axios.get(baseURL, { headers: { Authorization: `Bearer ${token}` } })
    return data
}