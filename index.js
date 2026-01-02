import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import dbConnect from './db.js'
import userRouter from './routes/userRouter.js'
import noteRouter from './routes/noteRouter.js'
import Notes from './models/Notes.js'

dotenv.config()

const app = express()

// ✅ Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(express.json())
app.use(express.static('public'))

// ✅ Test route
app.get("/", (req, res) => {
    res.send("iNotebook Backend Running Successfully 🚀");
})

// ✅ Routes
app.use('/api/auth', userRouter)
app.use('/api/notes', noteRouter)

// ✅ Server start
const serverStart = async () => {
    try {
        await dbConnect()
        await Notes.syncIndexes()
        console.log("Indexes Synced")

        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error("ERROR:", error)
    }
}

serverStart()

export default app
