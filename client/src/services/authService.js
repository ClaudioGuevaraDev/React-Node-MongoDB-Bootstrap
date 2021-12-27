import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/auth'

export const signIn = async ({ email, password }) => {
    const { data } = await axios.post(`${baseUrl}/sign-in`, { email, password })
    return data
}

export const signUp = async ({ username, email, password }) => {
    const { data } = await axios.post(`${baseUrl}/sign-up`, { username, email, password })
    return data
}

export const validateToken = async (token) => {
    
    return await axios.post(`${baseUrl}/validate-token`, { headers: { Authorization: `Bearer ${token}` } })
}