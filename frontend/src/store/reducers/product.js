import * as actionTypes from '../actions/actionTypes';

const initialState = {
	products: [],
	product: {}
};

const reducer = (state = initialState, action) => {

	const { type } = action;

	switch (type) {
		case actionTypes.GET_PRODUCTS:
			return { ...state, products: [...action.products] };
		case actionTypes.GET_PRODUCT:
			return { ...state, product: {...action.product} };
		case actionTypes.UPDATE_PRODUCT:
			return { ...state, product: {...action.product} };
		default: return state;
	}
};

export default reducer;
