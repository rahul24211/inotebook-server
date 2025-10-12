
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

export const reg = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { name, email, password } = req.body
        const user = await User.findOne({ email })
        let success = false

        if (user) {
            success = false
            return res.json({
                status: 401,
                message: 'User is already taken, please login',
                success
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = await User.create({ name, email, password: hashedPass })
        const JWT_SECRET_STRING = process.env.JWT_STRING
        const data = {
            user: {
                id: newUser._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET_STRING)
        success = true
        return res.json({
            status: 201,
            message: 'User ragister successfully',
            apiData: newUser,
            authToken: authToken,
            success
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'server error' })
    }
}

export const login = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { email, password } = req.body
        const checkUser = await User.findOne({ email })
        let success = false
        if (!checkUser) {
            success = false
            return res.json({
                status: 404,
                message: 'user not found, please register',
                success
            })
        }
        const checkPass = await bcrypt.compare(password, checkUser.password)
        if (!checkPass) {
            success = false
            return res.json({
                status: 401,
                message: 'password do not match',
                success
            })
        }
        const data = {
            user: {
                id: checkUser._id
            }
        }
        const JWT_SECRET_STRING = process.env.JWT_STRING
        const authToken = jwt.sign(data, JWT_SECRET_STRING)
        success = true
        return res.json({
            status: 200,
            message: 'login successfully',
            authToken: authToken, success,
           apiData : checkUser.name
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'server error' })
    }
}

export const getUser = async (req, res) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        return res.json({
            user
        })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: 'server error' })
    }

}