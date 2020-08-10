//ambil router dan model
const router = require('express').Router();
let Book = require('../models/book.model');

//mengambil json
router.route('/').get((req, res) => {
  Book.find()
    .then(book => res.json(book))
    .catch(err => res.status(400).json('Error: ' + err));
});

//membuat buku baru
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const genre = req.body.genre;
  const pages= Number(req.body.pages);
  const date = Date.parse(req.body.date);

  const newBook = new Book({
    username,
    title,
    author,
    description,
    genre,
    pages,
    date,
  });

  newBook.save()
  .then(() => res.json('Book added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//perintah dengan menggunakan id
router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
      .then(book => res.json(book))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
      .then(() => res.json('Book deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Book.findById(req.params.id)
      .then(book => {
        book.username = req.body.username;
        book.title = req.body.title;
        book.author = req.body.author;
        book.description = req.body.description;
        book.genre = req.body.genre;
        book.pages = Number(req.body.pages);
        book.date = Date.parse(req.body.date);
  
        book.save()
          .then(() => res.json('Book updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;