import Role from '../models/Role'

const isAdmin = async (req, res, next) => {
    const roleFound = await Role.findOne({ name: req.role })
    if (!roleFound) return res.status(401).json({ message: 'Unauthorized. ' })
    
    if (roleFound.name !== "Admin") return res.status(401).json({ message: 'Unauthorized. ' })

    next()
}

export default isAdmin