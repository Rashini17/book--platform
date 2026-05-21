const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepic: { type: String, default: '' },
  bio: { type: String, default: '' },
  role: { type: String, enum: ['user', 'writer', 'admin'], default: 'user' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  library: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  readingHistory: [{type: mongoose.Schema.Types.ObjectId,ref: "Book"}],
  bookmarks: [{type: mongoose.Schema.Types.ObjectId,ref: "Chapter"}],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);