const db = require("../models");
const Category = db.categories;
const Product = db.products;
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

// Create and Save a new Category
exports.create = (req, res) => {

	if (!req.body.title) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	// Create a Category
	const category = {
		title: req.body.title,
		description: req.body.description ? req.body.description : null,
		published: req.body.published ? req.body.published : false
	};

	// Save Category in the database
	Category.create(category)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			if (err instanceof sequelize.UniqueConstraintError) {
				// throw new Error('duplicate error')

				//todo: передавать на фронт ошибку
				res.status(400).send({
					error: 'Some error occurred while creating the Category.',
					message:
						err.message || "duplicate error"
				});
			} else
				res.status(500).send({
					error: 'Some error occurred while creating the Category.',
					message:
						err.message || "Some error occurred while creating the Category."
				});
		});
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
	const searched = req.query.title;
	// if (searched) searched.toLowerCase();

	const select = 'SELECT categories.*, COUNT(products.id) AS productsCount FROM categories left OUTER JOIN  products ON categories.id=products."categoryId" GROUP BY categories.id;'
	db.sequelize.query(select)
		.then(results => {
			console.log("results", results)
			res.send(results[0]);
		}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Some error occurred while retrieving Categories."
		});
	});
};

// Find a single Category with an id
exports.findOne = (req, res) => {
	const id = req.params.id;
	Category.findByPk(id, {include: ["products"]})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Category with id=" + id
			});
		});
};

// Update a Category by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Category.update(req.body, {
		where: {id: id}
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Category was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Category with id=" + id
			});
		});
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Category.destroy({
		where: {id: id}
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Category was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Category with id=" + id
			});
		})
};

exports.checkTitle = (req, res) => {
	const title = req.params.title;
	const select = "SELECT * FROM categories WHERE title='"+title+"'"
	db.sequelize.query(select)
		.then(results => {
			console.log("results", results)
			res.send(results[0]);
		}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Some error occurred while retrieving Categories."
		});
	});
};
