import Role from "../models/Role";

export const createRoles = async () => {
    try {   
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return

        new Promise.all([
            new Role({ name: 'User' }).save(),
            new Role({ name: 'Admin' }).save()
        ])
    } catch (error) {
        console.log('Error to create the roles.')
    }
}