//Lógica de Usuario

import User from '../User/user.model.js'

export const updateUser = async(req, res)=>{
    const { id } = req.params
    const { role, ...data } = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated successfully :)',
                updateUsers
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding User',
                err
            }
        )
    }
}

//Obtener los usuarios
export const getAll = async(req, res)=>{
    const { limit , skip } = req.query
    try {
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if(users.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Users not Found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found :)',
                total: users.length,
                users
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}