const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    coverImage: {
        type: String,
        default: ""
    },

    language: {
        type: String,
        default: "English"
    },

    category: {
        type: String,
        default: "General"
    },

    votes: {
        type: Number,
        default: 0
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    readers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

},
{ timestamps: true });

module.exports = mongoose.model("Book", bookSchema);