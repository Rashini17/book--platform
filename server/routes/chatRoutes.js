const express = require("express");

const Message = require("../models/Message");

const authMiddleware =
require("../middleware/authMiddleware");

const router = express.Router();


// SEND MESSAGE
router.post(
"/send",

authMiddleware,

async (req, res) => {

    try {

        const {
            receiver,
            text
        } = req.body;

        const newMessage =
        new Message({

            sender: req.user.id,

            receiver,

            text

        });

        await newMessage.save();

        res.status(201).json({

            message:
            "Message sent",

            data: newMessage

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET CHAT
router.get(
"/:userId",

authMiddleware,

async (req, res) => {

    try {

        const messages =
        await Message.find({

            $or: [

                {
                    sender: req.user.id,
                    receiver:
                    req.params.userId
                },

                {
                    sender:
                    req.params.userId,
                    receiver:
                    req.user.id
                }

            ]

        }).sort({ createdAt: 1 });

        res.status(200).json(messages);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;