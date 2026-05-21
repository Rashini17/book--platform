const express = require("express");

const Comment = require("../models/Comment");

const authMiddleware =
require("../middleware/authMiddleware");

const router = express.Router();


// ADD COMMENT
router.post("/add",
authMiddleware,
async (req, res) => {

    try {

        const { bookId, comment } = req.body;

        const newComment = new Comment({

            userId: req.user.id,
            bookId,
            comment

        });

        await newComment.save();

        res.status(201).json({
            message: "Comment added successfully",
            comment: newComment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET COMMENTS BY BOOK
router.get("/:bookId",
async (req, res) => {

    try {

        const comments =
        await Comment.find({
            bookId: req.params.bookId
        }).populate("userId", "username");

        res.status(200).json(comments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;