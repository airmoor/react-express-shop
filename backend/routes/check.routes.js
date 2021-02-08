module.exports = app => {
	const categories = require("../controllers/category.controller.js");
	const products = require("../controllers/product.controller.js");

	const router = require("express").Router();
	// Find if unique name
	router.get("/category/:title", categories.checkTitle);

	// Create a new Tutorial
	// router.get("/check/product/:title", products.checkTitle);

	app.use('/api/check', router);
};
