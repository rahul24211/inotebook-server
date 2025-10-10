
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {
        type: String
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String,
        unique: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})




const User = new mongoose.model('User',UserSchema)

export default User