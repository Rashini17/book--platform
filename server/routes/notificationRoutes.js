const express = require("express");

const Notification = require("../models/Notification");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET USER NOTIFICATIONS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const notifications =
        await Notification.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(notifications);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// MARK AS READ
router.put("/read/:id",
authMiddleware,
async (req, res) => {

    try {

        const notification =
        await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        notification.isRead = true;

        await notification.save();

        res.status(200).json({
            message: "Notification marked as read"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;