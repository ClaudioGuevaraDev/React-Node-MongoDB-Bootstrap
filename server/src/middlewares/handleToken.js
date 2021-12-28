import jwt from 'jsonwebtoken'

import config from '../config'

const getTokenFrom = (req) => {
    let authorization
    if (req.body.headers) {
        authorization = req.body.headers.Authorization
    } else if (req.get('authorization')) {
        authorization = req.get('authorization')
    } 

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return
}

const handleToken = (req, res, next) => {
    const token = getTokenFrom(req)

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token, config.SECRET)

    const { role } = jwt.decode(token, config.SECRET)
    
    req.role = role

    next()
}

export default handleToken