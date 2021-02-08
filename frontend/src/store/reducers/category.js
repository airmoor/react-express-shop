import * as actionTypes from '../actions/actionTypes';

const initialState = {
	categories: [],
	category: {}
};

const reducer = (state = initialState, action) => {

	const { type } = action;

	switch (type) {

		case actionTypes.GET_CATEGORIES:
			return { ...state, categories: [...action.categories] };
		case actionTypes.GET_CATEGORY:
			return { ...state, category: {...action.category} };
		case actionTypes.UPDATE_CATEGORY:
			return { ...state, category: {...action.category} };
		case actionTypes.UPDATE_CATEGORY_PRODUCTS:
			return { ...state, category: {...state.category, products: [...action.products] } };
		case actionTypes.DELETE_CATEGORY:
			return { ...state, categories: state.categories.slice(1) };

	}
	return state;
};

export default reducer;
