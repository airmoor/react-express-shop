import CategoryDataService from "./category.service";
import { debounce } from "debounce";

export const checkCategoryTitleExists = (text) => {
	let isExists = false;
	console.log('debounce:',text)

	CategoryDataService.checkTitle(text)
		.then(response => {
			// console.log('response',response)
			if (response.data.length)
				isExists = true;
		})
		.catch(e => {
			console.log(e);
		}).finally(()=> {
		// console.log(isExists);
		return isExists
	})
};

export const isCategoryTitleExists = debounce(checkCategoryTitleExists, 3000)



