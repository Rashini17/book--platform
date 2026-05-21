const express = require("express");

const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ADD BOOK TO LIBRARY
router.put("/library/:bookId",
authMiddleware,
async (req, res) => {

    try {

        const user =
        await User.findById(req.user.id);

        // Already exists check
        if (
            user.library.includes(req.params.bookId)
        ) {
            return res.status(400).json({
                message: "Book already in library"
            });
        }

        user.library.push(req.params.bookId);

        await user.save();

        res.status(200).json({
            message: "Book added to library"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ADD TO READING HISTORY
router.put(
"/history/:bookId",

authMiddleware,

async (req, res) => {

    try {

        const user =
        await User.findById(req.user.id);

        // Duplicate check
        if (
            !user.readingHistory.includes(
                req.params.bookId
            )
        ) {

            user.readingHistory.push(
                req.params.bookId
            );

            await user.save();

        }

        res.status(200).json({
            message:
            "Reading history updated"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
// BOOKMARK CHAPTER
router.put(
"/bookmark/:chapterId",

authMiddleware,

async (req, res) => {

    try {

        const user =
        await User.findById(req.user.id);

        if (
            user.bookmarks.includes(
                req.params.chapterId
            )
        ) {

            return res.status(400).json({
                message:
                "Already bookmarked"
            });

        }

        user.bookmarks.push(
            req.params.chapterId
        );

        await user.save();

        res.status(200).json({
            message:
            "Chapter bookmarked"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// WRITER DASHBOARD
router.get(
"/dashboard",

authMiddleware,

async (req, res) => {

    try {

        const books =
        await Book.find({
            author: req.user.id
        });

        const totalBooks =
        books.length;

        const totalVotes =
        books.reduce(
            (sum, book) =>
            sum + book.votes,
            0
        );

        res.status(200).json({

            totalBooks,

            totalVotes,

            books

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// FOLLOW WRITER
router.put("/follow/:id", authMiddleware, async (req, res) => {

    try {

        const userToFollow = await User.findById(req.params.id);

        const currentUser = await User.findById(req.user.id);

        if (!userToFollow) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Already following check
        if (
            currentUser.following.includes(userToFollow._id)
        ) {
            return res.status(400).json({
                message: "Already following"
            });
        }

        currentUser.following.push(userToFollow._id);

        userToFollow.followers.push(currentUser._id);

        await currentUser.save();

        await userToFollow.save();

        res.status(200).json({
            message: "Writer followed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;