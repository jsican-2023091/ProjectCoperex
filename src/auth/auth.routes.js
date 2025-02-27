//Rutas de autentificación
import { Router } from "express"
import { login, register, test } from "./auth.contoller.js"

const api = Router()

api.get(
    '/test',
    test
)

api.post(
    '/register',
    register
)

api.post(
    '/login',
    login
)

//Export
export default api