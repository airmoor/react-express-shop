const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

// Create and Save a new Product
exports.create = (req, res) => {
	console.log('req.body',req.body);
	if (!req.body.title) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	// Create a Product
	const productItem = {
		title: req.body.title,
		description: req.body.description ? req.body.description : null,
		categoryId: req.body.categoryId ? req.body.categoryId : null,
		brand: req.body.brand ? req.body.brand : null,
		model: req.body.model ? req.body.model : null,
		price: req.body.price ? req.body.price : null,
		published: req.body.published ? req.body.published : false
	};

	// Save Product in the database
	Product.create(productItem)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Product."
			});
		});
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
	let searched = req.query.title;
	if (searched) {
		if (typeof searched === 'string') searched.toLowerCase();
	}

	// const conditionTitle = searched ? {
	// 	title: sequelize.where( sequelize.fn('LOWER', sequelize.col('title') ), 'LIKE', '%' + searched + '%')
	// } : null;

	Product.findAll({ where: {
			[Op.or]: [
				{ model: {[Op.like]: `%${searched}%` }},
				{ title:  {[Op.like]: `%${searched}%` } },
				{ brand:  {[Op.like]: `%${searched}%` } },
				{ price: searched == parseInt(searched, 10) ?  searched : -1},
			]
		} })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Products."
			});
		});
};

// Find a single Product with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Product.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Product with id=" + id
			});
		});
};

// Update a Product by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Product.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Product was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Product with id=" + id
			});
		});
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Product.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Product was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Product with id=" + id
			});
		});
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
	Product.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Products were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all tutorials."
			});
		});
};