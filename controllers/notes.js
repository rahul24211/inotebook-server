import { validationResult } from 'express-validator'
import Notes from '../models/Notes.js'

export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })

        res.json(notes)


    } catch (error) {
        console.error(error.message)
        res.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

export const addNotes = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { title, description, tag } = req.body
        const userId = req.user.id

        const existingNotes = await Notes.findOne({
            user: userId,
            description: description
        })

        if (existingNotes) {
            return res.json({
                status: 400,
                message: "this notes description already exist please enter unique description"
            })
        } else {
            const note = new Notes({ title, description, tag, user: userId })
            const saveNote = await note.save()

            res.json({
                status: 201,
                message: 'Notes added successfully',
                note: saveNote
            })
        }





    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

export const notesUpdate = async (req, res) => {
    const { title, description, tag } = req.body
    const id = req.params.id

    try {
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(id)
        if (!note) {
            return res.json({
                status: 404,
                message: 'not found'
            })
        }
        if (note.user.toString() !== req.user.id) {
            return res.json({
                status: 401,
                message: 'not allowed'
            })
        }
        note = await Notes.findByIdAndUpdate(id, { $set: newNote }, { new: true })
        res.json({
            status: 201,
            message: "notes updeted successfully",
            note
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error', error: error.message })
    }
}

export const deleteNote = async (req, res) => {
    const id = req.params.id
    try {
        let note = await Notes.findById(id)
        if (!note) {
            return res.json({
                status: 404,
                message: 'not found'
            })
        }
        if (note.user.toString() !== req.user.id) {
            return res.json({
                status: 401,
                message: 'not allowed'
            })
        }
        note = await Notes.findByIdAndDelete(id)
        res.json({
            status: 201,
            message: 'note delete successfully',
            note: note
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error', error: error.message })
    }
}