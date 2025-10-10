


import mongoose from "mongoose";
const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

NotesSchema.index({ user: 1, description: 1 }, { unique: true })

const Notes = new mongoose.model('Notes', NotesSchema)
export default Notes

