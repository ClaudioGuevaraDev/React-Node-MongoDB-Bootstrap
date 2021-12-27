import jwt from 'jsonwebtoken'

import config from '../config'

const getTokenFrom = (req) => {
    const authorization = req.body.headers.Authorization

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return
}

const handleToken = (req, res, next) => {
    const token = getTokenFrom(req)
    
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token, config.SECRET)

    next()
}

export default handleToken