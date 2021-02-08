import * as actionTypes from './actionTypes';
import CategoryDataService from "../../services/category.service";
import ProductDataService from "../../services/product.service";
// Actions

export const getCategoriesAC = (categories) => ({
	type: actionTypes.GET_CATEGORIES,
	categories: categories.data
});

export const getCategoryAC = (category) => ({
	type: actionTypes.GET_CATEGORY,
	category: category.data
});

export const setCategoryAC = (category) => ({
	type: actionTypes.UPDATE_CATEGORY,
	category: category.data
});

export const createCategoryAC = (category) => ({
	type: actionTypes.CREATE_CATEGORY,
	category: category.data
});

export const searchProductsAC = (products) => ({
	type: actionTypes.UPDATE_CATEGORY_PRODUCTS,
	products: products
});


// Dispatchers
export const getCategories = () => {
	return (dispatch) => {
		return CategoryDataService.getAll()
			.then(response => dispatch(getCategoriesAC(response)))
			.then(response => console.log('getCategories response:', response))
			.catch(e => {
				console.log(e);
			});
	};
};

export const getCategory = (id) => {
	return (dispatch) => {
		return CategoryDataService.get(id)
			.then(response => dispatch(getCategoryAC(response)))
			.then(response => {
				console.log('getCategory response: ', response);
			})
			.catch(e => {
				console.log('getCategory error: ',e);
			});
	};
};

export const deleteCategory = (id) => {
	return (dispatch) => {
		return CategoryDataService.delete(id)
			.then(response => {
				console.log(response.data);
			}).then((res) => {
				getCategories()
			})
			.catch(e => {
				console.log(e);
			});
	};
};


export const updateCategory = (id, data) => {
	return (dispatch) => {
		return CategoryDataService.update(id, data)
			.then(response => {
				dispatch(setCategoryAC(response))
			})
			.catch(e => {
				console.log(e);
			});
	};
};

export const createCategory = (data) => {
	return (dispatch) => {
		return CategoryDataService.create(data)
			.then(response => {
				dispatch(createCategoryAC(response))
			})
			.catch(e => {
				console.log('createCategory error', e, e.message);
			});
	};
};

export const searchProducts = (search, catalogId) => {
	return (dispatch) => {
		return ProductDataService.findByTitle(search, catalogId)
			.then(response => {
				let products = response.data.filter(el => el.categoryId == catalogId)
				dispatch(searchProductsAC(products))
			})
			.catch(e => {
				console.log(e);
			});
	};
};

