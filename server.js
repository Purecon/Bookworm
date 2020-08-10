//butuh variabel express dan cors untuk node.js
const express = require('express');
const cors = require('cors');
//variabel mongoose
const mongoose = require('mongoose');

//pengaturan sesuai dotenv (tidak perlu setting .env)
require('dotenv').config;

//membuat express server
const app = express();
const port = process.env.PORT || 5000;

//ATLAS_URI=mongodb+srv://Admin:Passbaru123@cluster0.mtqrk.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
//connect ke mongoose
const uri = "mongodb+srv://Admin:Passbaru123@cluster0.mtqrk.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority;";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//middleware dan parse json
app.use(cors());
app.use(express.json());

//buat API
const bookRouter = require('./routes/book');
const usersRouter = require('./routes/users');

app.use('/book', bookRouter);
app.use('/users', usersRouter);

//listen ke port tertentu
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});