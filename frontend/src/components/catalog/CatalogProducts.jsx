import React from 'react';
import CatalogProductItem from "./CatalogProductItem";

export default function CatalogProducts(props) {
	const products = props.products;
	let productItems;
	if (products && products.length)
		productItems = products.map((product) =>
			<CatalogProductItem key={product.id} product={product}/>
		);

	return (
		<React.Fragment>
			{productItems}
		</React.Fragment>
	);
}