//Gestionar autenticación
import User from '../User/user.model.js'
import { encrypt, checkPassword } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const test = (req, res) => {
    console.log('Test is running')
    res.send(
        {
            message: 'Test is running'
        }
    )
}

//Register
export const register = async(req, res) => {
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)

        await user.save()
        return res.send(
            {
                message: `Registering succesfully, can be login with username: ${user.username}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with user registration',
                err
            }
        )
    }
}

//Login
export const login = async(req, res) => {
    try {
        let { userLoggin, password} = req.body
        let user = await User.findOne(
            {
                $or: [
                    {username: userLoggin},
                    {email: userLoggin}
                ]
            }
        )
        console.log(user)
        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.username}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send(
            {
                message: 'Invalid credential'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send({
                message: 'General error whit login function',
                err
            }
        )
    }
}