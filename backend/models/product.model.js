module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define("product", {
		title: {
			type: Sequelize.STRING,
			unique: {
				msg: "There is already an item that contains the exact same values of the following keys"
			},
		},
		description: {
			type: Sequelize.STRING
		},
		brand: {
			type: Sequelize.STRING
		},
		model: {
			type: Sequelize.STRING
		},
		price: {
			type: Sequelize.INTEGER,
		}
	});

	return Product;
};