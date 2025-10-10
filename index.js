import dotenv from 'dotenv'
import dbConnect from './db.js'
import express from 'express'
import userRouter from './routes/userRouter.js'
import cors from 'cors'
import noteRouter from './routes/noteRouter.js'
import Notes from './models/Notes.js'

dotenv.config()
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,

}))



app.use('/api/auth', userRouter)
app.use('/api/notes', noteRouter)

const serverStart = async () => {

    try {
        await dbConnect()
        await Notes.syncIndexes();
        console.log('Indexes Synced');

        app.listen(port, () => {
            console.log(`server is running port = ${port}`);

        })
    } catch (error) {
        console.error('ERROR', error)
    }

}

serverStart()
