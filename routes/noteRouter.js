import express from 'express'
import getUsers from '../middilerWare/getUser.js'
import { addNotes, deleteNote, getNotes, notesUpdate } from '../controllers/notes.js'
import { body } from 'express-validator'

const noteRouter = express.Router()

noteRouter.get('/getnotes',getUsers ,getNotes)
noteRouter.post('/addnotes',getUsers,[
    body('title').isLength({min : 3}).withMessage('Title must be atleast 3 characters'),
    body('description').isLength({min : 3}).withMessage('Description must be atleast 3 characters'),
    body('tag').isLength({min : 3}).withMessage('Tag must be atleast 3 characters')
] ,addNotes)
noteRouter.put('/notesupdate/:id',getUsers, notesUpdate)
noteRouter.delete('/deletenote/:id',getUsers,deleteNote)
export default noteRouter