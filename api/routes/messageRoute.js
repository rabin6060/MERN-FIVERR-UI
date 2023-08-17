import express from 'express'
import { getMessages,createMessage } from '../controllers/messageController.js'
import {verifyToken} from '../middleware/jwt.js'
const router = express.Router()

router.post('/',verifyToken,createMessage)
router.get('/:id',verifyToken,getMessages)

export default router