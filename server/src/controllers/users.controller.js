import User from "../models/User";

export const getAllUsers = async (req, res) => {
    const users = await User.find({}).populate({
        path: 'role',
        select: {
            '_id': 0,
            'name': 1
        }
    })

    res.json(users)
}