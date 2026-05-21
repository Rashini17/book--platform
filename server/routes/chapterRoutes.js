const express = require("express");

const Chapter = require("../models/Chapter");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ADD CHAPTER
router.post("/add", authMiddleware, async (req, res) => {

    try {

        const {
            title,
            content,
            bookId
        } = req.body;

        const newChapter = new Chapter({

            title,
            content,
            bookId

        });

        await newChapter.save();

        res.status(201).json({
            message: "Chapter added successfully",
            chapter: newChapter
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET CHAPTERS BY BOOK
router.get("/:bookId", async (req, res) => {

    try {

        const chapters = await Chapter.find({
            bookId: req.params.bookId
        });

        res.status(200).json(chapters);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;