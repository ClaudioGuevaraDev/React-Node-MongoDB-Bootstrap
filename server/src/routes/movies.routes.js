import express from 'express'

import * as moviesCtrl from '../controllers/movies.controller'
import * as middlewares from '../middlewares'

const { Router } = express

const router = Router()

router.post('/', [
    middlewares.handleToken,
], moviesCtrl.createMovie)
router.put('/upload-image/:id', [
    middlewares.handleToken,
    middlewares.fileUpload
], moviesCtrl.uploadImageMovie)
router.get('/', [
    middlewares.handleToken,
], moviesCtrl.getAllMovies)

export default router