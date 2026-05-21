const express = require("express");

const Book = require("../models/Book");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE BOOK
router.post("/create", authMiddleware, async (req, res) => {

    try {

        const {
            title,
            description,
            coverImage,
            language,
            category
        } = req.body;

        const newBook = new Book({

            title,
            description,
            coverImage,
            language,
            category,

            author: req.user.id

        });

        await newBook.save();

        res.status(201).json({
            message: "Book created successfully",
            book: newBook
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

 // VOTE BOOK
router.put("/vote/:id", authMiddleware, async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        book.votes += 1;

        await book.save();

        res.status(200).json({
            message: "Vote added",
            votes: book.votes
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// SEARCH BOOKS
router.get("/search/:keyword",
async (req, res) => {

    try {

        const books =
        await Book.find({

            title: {
                $regex: req.params.keyword,
                $options: "i"
            }

        });

        res.status(200).json(books);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// GET ALL BOOKS
router.get("/", async (req, res) => {

    try {

        const books = await Book.find()
        .populate("author", "username email");

        res.status(200).json(books);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

    router.get("/recommend/:userId", async (req, res) => {

    try {

        const userId = req.params.userId;

        // Example simple AI logic:
        // 1. Get all books
        const books = await Book.find();

        // 2. Sort by votes (popular first)
        const sorted = books.sort((a, b) => b.votes - a.votes);

        // 3. Return top 5 as recommendations
        const recommendations = sorted.slice(0, 5);

        res.json(recommendations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

});

module.exports = router;