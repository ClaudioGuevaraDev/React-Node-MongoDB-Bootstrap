import dotenv from 'dotenv'

dotenv.config()

const config = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/project01'
}

export default config