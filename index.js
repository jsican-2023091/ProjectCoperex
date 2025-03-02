//Ejecutar
import { initServer } from './config/app.js'
import { config } from 'dotenv'
import { connect } from './config/mongo.js'
import { createAdminUser, createCategory } from './config/init.js'

config()
connect()
createAdminUser()
createCategory()
initServer()