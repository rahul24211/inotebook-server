import express from 'express'
import { body } from 'express-validator'

import { reg, login, getUser } from '../controllers/auth.js'
import getUsers from '../middilerWare/getUser.js'

const userRouter = express.Router()

userRouter.post('/register', [
    body('name').isLength({ min: 3 }).withMessage("Name must be 3 characters"),
    body('email').isEmail().withMessage('Email is Requires'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long')
], reg)
userRouter.post('/login', login)

userRouter.post('/getuser', getUsers, getUser)



export default userRouter