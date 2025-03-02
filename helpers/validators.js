import { body } from 'express-validator'
import { existUsername, existEmai } from './db.validators'

//Register
export const registerVali = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .custom(existUsername),
        body('email', 'Email cannot be empty or is not a valid email')
            .notEmpty()
            .isEmail()
            .custom(existEmail),
        body('password', 'Password cannot be empty')
            .notEmpty()
            .isStrongPassword()
            .withMessage('Password must be strong')
            .isLength({min: 8})
]

//login
export const loginValidation = [
    body('userLoggin', 'Username or Email cannot be empty')
        .notEmpty(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .isLength({min: 8})
        .withMessage('The password must be strong'),
    validateErrorWithoutImg
]

export const categoryValid = [
    body('name', 'Name cannot be empty')
    .notEmpty(),
    body('description', 'Description cannot be empty')
    .notEmpty()
]

export const companyValid = [
    body('name', 'Name cannot be empty')
    .notEmpty(),
    body('levelImpact','Level impact cannot be empty')
    .notEmpty(),
    body('yearsExperiencie','yeaar of experience cannot be empty')
    .notEmpty(),
    body('category','Category cannot be empty')
    .notEmpty(),
    body('direction','Direction cannot be empty')
    .notEmpty(),
    body('contact','Contact cannot be empty')
    .notEmpty(),
]