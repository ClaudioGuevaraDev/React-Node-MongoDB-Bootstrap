import Role from "../models/Role";

export const createRole = async (req, res) => {
    const newRole = new Role(req.body)

    const savedRole = await newRole.save()

    res.status(201).json(savedRole)
}

export const getAllRoles = async (req, res) => {
    const roles = await Role.find({})

    res.json(roles)
}