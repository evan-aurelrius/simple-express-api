const express = require('express')
const router = express.Router()
const books = require('../controllers/book.controller.js')

// Retrieve all Books
router.get('/', books.findAll)
// Create a new Book
router.post('/', books.create)

module.exports = router