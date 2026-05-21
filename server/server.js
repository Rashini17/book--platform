require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { setIO } = require("./utils/notification");
const { sendNotification } = require("../utils/notification");


const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);

app.use("/api/chapters", chapterRoutes);

app.use("/api/users", userRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/chat", chatRoutes);


// TEST ROUTE
app.get("/", (req, res) => {

    res.send("Book Platform API Running...");

});


// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// SOCKET.IO SERVER
const server = http.createServer(app);

const io = new Server(server, {

    cors: {
        origin: "*"
    }

});


// SOCKET EVENTS
io.on("connection", (socket) => {

    console.log("User connected");

    socket.on("disconnect", () => {

        console.log("User disconnected");

    });

});

let io;

io = new Server(server, {
    cors: { origin: "*" }
});

setIO(io);

sendNotification({
    message: "📚 New Book Added!",
    type: "book"
});


// PORT
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});