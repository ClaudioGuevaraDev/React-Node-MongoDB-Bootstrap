import User from "../models/User";
import Role from '../models/Role'

import { encryptPassword } from '../libs/handlePassword'

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

}