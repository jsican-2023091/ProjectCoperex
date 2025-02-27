//Ejecutar
import { initServer } from './config/app.js'
import { config } from 'dotenv'
import { connect } from './config/mongo.js'
import { createAdminUser } from './config/init.js'

config()
connect()
createAdminUser()
initServer()