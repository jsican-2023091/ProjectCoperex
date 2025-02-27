import { Router } from "express"

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