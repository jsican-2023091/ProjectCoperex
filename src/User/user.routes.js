import { Router } from "express"
import { getAll, updateUser } from "./user.controller.js"

const api = Router()

api.get(
    '/',
    getAll
)

api.post(
    '/update/:id',
    updateUser
)

export default api