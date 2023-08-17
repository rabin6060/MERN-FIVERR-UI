import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import {addGig, deleteGig, getGig, getGigs} from '../controllers/gigController.js'

const router = express.Router()

router.post('/',verifyToken,addGig)
router.delete('/gig/:id',verifyToken,deleteGig)
router.get('/single/:id',getGig)
router.get('/',getGigs)


export default router