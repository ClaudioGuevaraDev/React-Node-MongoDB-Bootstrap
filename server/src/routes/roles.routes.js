import express from 'express'

import * as rolesCtrl from '../controllers/roles.controller'

const { Router } = express

const router = Router()

router.post('/', rolesCtrl.createRole)
router.get('/', rolesCtrl.getAllRoles)

export default router