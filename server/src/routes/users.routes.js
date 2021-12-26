import express from 'express'

import * as usersCtrl from '../controllers/users.controller'

const { Router } = express

const router = Router()

router.get('/', usersCtrl.getAllUsers)

export default router