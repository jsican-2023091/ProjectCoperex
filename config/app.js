//Configuraciones del servidor de express

'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"

import authRoutes from '../src/auth/auth.routes.js'
import categoryRoutes from '../src/Category/category.routes.js'
import companyRoutes from '../src/Company/company.routes.js'
import reportRoutes from '../src/Report/report.routes.js'
import userRoutes from '../src/User/user.routes.js'

import { limiter } from '../middleware/rate.limit.js'

const configs = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app) => {
    app.use(authRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/company', companyRoutes)
    app.use('/v1/report', reportRoutes)
    app.use('/v1/user', userRoutes)
}

export const initServer = async() => {
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error(
            'Server init failded',
            err
        )
    }
}