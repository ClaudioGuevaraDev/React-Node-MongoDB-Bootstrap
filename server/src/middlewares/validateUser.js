import validator from 'email-validator'

import User from "../models/User"


export const validateUsername = async (req, res, next) => {
    const { username } = req.body

    if (username) {
        const userFound = await User.findOne({ username: username })

        if (userFound) return res.status(400).json({ message: 'User already exists.' })
    }

    next()
}

export const validateEmail = async (req, res, next) => {
    const { email } = req.body

    if (email) {
        if (!validator.validate(email)) {
            return res.status(400).json({ message: 'Malform email.' })
        }
        const userFound = await User.findOne({ email: email })

        if (userFound) return res.status(400).json({ message: 'User already exists.' })
    }

    next()
}