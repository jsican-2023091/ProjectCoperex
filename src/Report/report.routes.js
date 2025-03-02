import { Router } from "express"
import { generateReport } from "./report.controller.js"

const api = Router()

api.get(
    '/generateReport',
    generateReport
)

export default api