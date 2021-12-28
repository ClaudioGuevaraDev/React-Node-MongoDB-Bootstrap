import express from 'express'

import * as moviesCtrl from '../controllers/movies.controller'
import * as middlewares from '../middlewares'

const { Router } = express

const router = Router()

router.post('/', moviesCtrl.createMovie)
router.put('/upload-image/:id', [middlewares.fileUpload], moviesCtrl.uploadImageMovie)
router.get('/', moviesCtrl.getAllMovies)

export default router