import React from 'react';
import HomeCatalogItem from "./HomeCatalogItem";

export default function HomeCatalogItems(props) {
	const catalogs = props.catalogs;
	let listItems;
	if (catalogs && catalogs.length)
		listItems = catalogs.map((catalog) =>
		<HomeCatalogItem key={catalog.id} catalog={catalog}/>
	);

	return (
		<React.Fragment>
			{listItems}
		</React.Fragment>
	);
}