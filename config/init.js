import User from '../src/User/user.model.js'
import { encrypt } from '../utils/encryp.js'

export const createAdminUser = async () => {
    try {
        const existingUser = await User.findOne({ username: 'admin' })
        if(existingUser) {
            console.log('Admin user already exist')
            return
        }

        const passwordHaah = await encrypt('admin123')

        const user = new User (
            {
                name: 'Jeff',
                surname: 'Sican',
                username: 'admin',
                email: 'admin123@gmail.com',
                password: passwordHaah
            }
        )

        await user.save()
    } catch (err) {
        console.error(
            'Error creating admin user',
            err
        )
    }
}