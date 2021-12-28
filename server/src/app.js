import 'express-async-errors'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'

import config from './config'

import { createRoles } from './libs/initialSetup'

import * as routes from './routes'
import * as middlewares from './middlewares'

const app = express()

createRoles()

app.set('port', config.PORT)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(express.static(path.join(__dirname, 'images')))

app.use('/api/roles', routes.rolesRoutes)
app.use('/api/auth', routes.authRoutes)
app.use('/api/users', routes.usersRoutes)
app.use('/api/movies', routes.moviesRoutes)

app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)

export default app