const express = require("express");

const User = require("../models/User");

const Book = require("../models/Book");

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const router = express.Router();


// GET ALL USERS
router.get(
"/users",

authMiddleware,
adminMiddleware,

async (req, res) => {

    try {

        const users =
        await User.find()
        .select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE USER
router.delete(
"/user/:id",

authMiddleware,
adminMiddleware,

async (req, res) => {

    try {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
            "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE BOOK
router.delete(
"/book/:id",

authMiddleware,
adminMiddleware,

async (req, res) => {

    try {

        await Book.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
            "Book deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DASHBOARD STATS
router.get(
"/stats",

authMiddleware,
adminMiddleware,

async (req, res) => {

    try {

        const totalUsers =
        await User.countDocuments();

        const totalBooks =
        await Book.countDocuments();

        res.status(200).json({

            totalUsers,
            totalBooks

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;