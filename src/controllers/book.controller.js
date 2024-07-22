const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
	const { title, author, publishedYear, sort, order = "ASC" } = req.query;
	let condition = {};

	if (title) {
		condition.title = { [Op.like]: `%${title}%` };
	}
	if (author) {
		condition.author = { [Op.like]: `%${author}%` };
	}
	if (publishedYear) {
		condition.publishedYear = { [Op.like]: `%${publishedYear}%` };
	}

	let orderCondition = [];
	if (sort) {
		orderCondition = [[sort, order.toUpperCase()]];
	}

	Book.findAll({
		where: condition,
		order: orderCondition,
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving books.",
			});
		});
};

// Create and Save a new Book
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		res.status(400).send({
			message: "Title can not be empty!",
		});
		return;
	}

	// Create a Book
	const book = {
		title: req.body.title,
		author: req.body.author,
		publishedYear: req.body.publishedYear,
	};

	// Save Book in the database
	Book.create(book)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Book.",
			});
		});
};
