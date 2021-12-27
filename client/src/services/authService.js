import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/auth'

export const signIn = async ({ email, password }) => {
    const { data } = await axios.post(`${baseUrl}/sign-in`, { email, password })
    return data
}