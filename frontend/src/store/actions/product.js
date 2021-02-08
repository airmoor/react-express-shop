import * as actionTypes from './actionTypes';
import ProductDataService from "../../services/product.service";
// Actions

export const getProductsAC = (products) => ({
	type: actionTypes.GET_PRODUCTS,
	products: products.data
});

export const getProductAC = (product) => ({
	type: actionTypes.GET_PRODUCT,
	product: product.data
});

export const setProductAC = (product) => ({
	type: actionTypes.UPDATE_PRODUCT,
	product: product.data
});

export const createProductAC = (product) => ({
	type: actionTypes.CREATE_PRODUCT,
	product: product.data
});

// Dispatchers

export const getProducts = () => {
	return (dispatch) => {
		return ProductDataService.getAll()
			.then(response => dispatch(getProductsAC(response)))
			.then(response => console.log('response', response))
			.catch(e => {
				console.log(e);
			});
	};
};

export const getProduct = (id) => {
	return (dispatch) => {
		return ProductDataService.get(id)
			.then(response => dispatch(getProductAC(response)))
			.then(response => {
				console.log('response', response);
			})
			.catch(e => {
				console.log(e);
			});
	};
};

export const deleteProduct = (id) => {
	return (dispatch) => {
		return ProductDataService.delete(id)
			.then(response => {
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	};
};

export const updateProduct = (id, data) => {
	return (dispatch) => {
		return ProductDataService.update(id, data)
			.then(response => {
				console.log('ProductDataService response', response)
				dispatch(setProductAC(response))
			})
			.catch(e => {
				console.log(e);
			});
	};
};

export const createProduct = (data) => {
	return (dispatch) => {
		return ProductDataService.create(data)
			.then(response => {
				dispatch(createProductAC(response))
			})
			.catch(e => {
				console.log('e', e, e.message);
			});
	};
};