import { Router } from "express"
import { getAll, saveCategory, updateCategory } from "./category.controller.js"
import { categoryValid } from "../../helpers/validators.js"

const api = Router()

api.post(
    '/save',
    [
        categoryValid
    ],
    saveCategory
)

api.put(
    '/update/:id',
    updateCategory
)

api.get(
    '/getAll',
    getAll
)

export default api