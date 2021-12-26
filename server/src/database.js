import mongoose from 'mongoose'

import config from './config'

const { connect } = mongoose

export const connection = async () => {
    try {
        const db = await connect(config.MONGO_URI)
        console.log(`Database ${db.connection.name} connected.`)
    } catch (error) {
        console.log(`Failed to connect database for: ${error}`)
    }
}