const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }

},
{ timestamps: true });

module.exports = mongoose.model("Chapter", chapterSchema);