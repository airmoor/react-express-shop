import './App.css';
import React from "react";
import {BrowserRouter as Router,Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from "./components/Home";
import Catalog from "./components/Catalog";
import CatalogEdit from "./components/CatalogEdit";
import ProductEdit from "./components/ProductEdit";
import CatalogCreate from "./components/CatalogCreate";
import history from './history'
import ProductCreate from "./components/ProductCreate";

export default function App() {
	return (
		<Container className="App my-5">
			<Router history={history}>
					<Route path="/" exact render={() => <Home />} />
					<Route path="/catalog/:id" exact render={() => <Catalog />} />
					<Route path="/catalog/:id/edit" render={() => <CatalogEdit />} />
					<Route path="/catalog-new"  render={() => <CatalogCreate />} />
					<Route path="/catalog/:id/product/:productId/edit" render={() => <ProductEdit />} />
					<Route path="/catalog/:id/new" render={() => <ProductCreate />} />
			</Router>
		</Container>
	);
}

