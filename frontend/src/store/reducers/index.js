import { combineReducers } from 'redux';
import categoryReducer from './category';
import productReducer from './product';

export const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
});
