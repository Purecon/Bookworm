const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  username: { type: String, required: true },    
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  pages: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;