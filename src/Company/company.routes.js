import { Router } from "express"
import { getAll, getCompaniesByCategory, getCompaniesByExperience, getCompaniesSortedAZ, saveCompany, update } from "./company.controller.js"
import { companyValid } from "../../helpers/validators.js"

const api = Router()

api.post(
    '/save',
    [
        companyValid
    ],
    saveCompany
)

api.put(
    '/update/:id',
    update
)

api.get(
    '/getAll',
    getAll
)

api.get(
    '/byExperience',
    getCompaniesByExperience
)   

api.get(
    '/byCategory',
    getCompaniesByCategory
)

api.get(
    'bySortedAZ',
    getCompaniesSortedAZ
)
export default api