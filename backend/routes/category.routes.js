module.exports = app => {
	const categories = require("../controllers/category.controller.js");

	const router = require("express").Router();

	// Create a new category
	router.post("/", categories.create);

	// Retrieve all categories
	router.get("/", categories.findAll);

	// Retrieve a single category with id
	router.get("/:id", categories.findOne);

	// Update a category with id
	router.put("/:id", categories.update);

	// Delete a category with id
	router.delete("/:id", categories.delete);

	app.use('/api/categories', router);
};