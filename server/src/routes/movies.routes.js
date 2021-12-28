import express from 'express'

import * as moviesCtrl from '../controllers/movies.controller'
import * as middlewares from '../middlewares'

const { Router } = express

const router = Router()

router.post('/', [
    middlewares.handleToken,
    middlewares.isAdmin,
], moviesCtrl.createMovie)
router.put('/upload-image/:id', [
    middlewares.handleToken,
    middlewares.isAdmin,
    middlewares.fileUpload
], moviesCtrl.uploadImageMovie)
router.get('/', [
    middlewares.handleToken
], moviesCtrl.getAllMovies)
router.get('/:id', [
    middlewares.handleToken,
    middlewares.isAdmin,
], moviesCtrl.getOneMovie)
router.delete('/:id', [
    middlewares.handleToken,
    middlewares.isAdmin,
], moviesCtrl.deleteMovie)
router.put('/:id', [
    middlewares.handleToken,
    middlewares.isAdmin
], moviesCtrl.updateMovie   )
router.put('/update-image/:id', [
    middlewares.handleToken,
    middlewares.isAdmin,
    middlewares.fileUpload,
], moviesCtrl.updateImageMovie)

export default router