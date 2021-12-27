import jwt from 'jsonwebtoken'

import User from "../models/User";
import Role from '../models/Role'
import config from '../config';

import { encryptPassword, comparePassword } from '../libs/handlePassword'

export const signUp = async (req, res) => {
    const { password, role } = req.body
    let roleFound

    if (!password) return res.status(400).json({ message: 'Fields are missing.' })

    if (role) {
        roleFound = await Role.findOne({ name: role })
    } else {
        roleFound = await Role.findOne({ name: 'User' })
    }

    const newUser = new User({
        ...req.body,
        password: await encryptPassword(password),
        role: roleFound
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
}

export const signIn = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Fields are missing.' })

    const userFound = await User.findOne({ email: email })
    if (!userFound) return res.status(401).json({ message: 'Error to login.' })

    if (!await comparePassword(password, userFound.password)) return res.status(401).json({ message: 'Error to login.' })

    const roleFound = await Role.findOne({ _id: userFound.role })

    const userToken = {
        id: userFound._id,
        username: userFound.username,
        role: roleFound.name
    }

    const token = jwt.sign(userToken, config.SECRET, {
        expiresIn: 60
    })

    res.json({token})
}

export const validateToken = (req, res) => {
    
    res.json({ message: 'Authorized.' })
}