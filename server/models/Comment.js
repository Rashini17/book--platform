const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },

    comment: {
        type: String,
        required: true
    }

},
{ timestamps: true });

module.exports =
mongoose.model("Comment", commentSchema);