import express from 'express'

import { validateUsername, validateEmail } from '../middlewares/validateUser'

import * as authCtrl from '../controllers/auth.controller'

const { Router } = express

const router = Router()

router.post('/sign-up', [
    validateUsername,
    validateEmail,
], authCtrl.signUp)
router.post('/sign-in', authCtrl.signIn)


export default router