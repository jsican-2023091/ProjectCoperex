//Rutas de autentificación
import { Router } from "express"
import { login, register, test } from "./auth.contoller.js"
import { loginValidation, registerVali } from "../../helpers/validators.js"

const api = Router()

api.get(
    '/test',
    test
)

api.post(
    '/register',
    [
        registerVali
    ],
    register
)

api.post(
    '/login',
    [
        loginValidation
    ],
    login
)

//Export
export default api