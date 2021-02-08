import React from 'react';
import {NavLink} from 'react-router-dom';
import {Table, Form, Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CatalogProducts from "./catalog/CatalogProducts";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as actionCreators from './../store/actions';

class Catalog extends React.Component {

	constructor(props) {
		super(props);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.searchProduct = this.searchProduct.bind(this);
		this.onChangeSearch = this.onChangeSearch.bind(this);

		this.state = {
			id: null,
			title: "",
			description: "",
			published: false,
			submitted: false,
			catalog: {},
			searchText: ""
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getCategory(id);
	}

	onChangeTitle(e) {
		this.setState({
			title: e.target.value
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value
		});
	}

	searchProduct() {
		this.props.searchProducts (this.state.searchText, this.props.match.params.id)
	}

	onChangeSearch(e) {
		const text = e.target.value;
		this.setState({
			searchText: text
		});
	}

	render() {
		const { category } = this.props;
		return (
			<div>
				<div className="d-flex mb-3 justify-content-start">
					<NavLink className="mr-4" to={'/'}>
						К списку каталогов
					</NavLink>
				</div>
				<h1 className="text-center mb-4">{category.title}</h1>
				<div className="d-flex justify-content-between">
					<Form>
						<Form.Row className="">
							<Col xs="auto">
								<Form.Label htmlFor="inlineFormInput" srOnly>
									Name
								</Form.Label>
								<Form.Control
									value={this.state.searchText}
									onChange={this.onChangeSearch}
									className="mb-2"
									id="inlineFormInput"
									placeholder="Search"
								/>
							</Col>
							<Col xs="auto">
								<Button onClick={this.searchProduct} variant="outline-primary">
									Искать
								</Button>
							</Col>
						</Form.Row>
					</Form>
					<NavLink to={'/catalog/' + this.props.match.params.id + '/new'}>
						<Button variant="outline-primary">Создать товар</Button>
					</NavLink>
				</div>

				<Table striped bordered hover>
					<thead>
					<tr>
						<th>Название</th>
						<th>Бренд</th>
						<th>Модель</th>
						<th>Стоимость</th>
						<th></th>
						<th></th>
					</tr>
					</thead>
					<tbody>
						<CatalogProducts products={category.products}/>
					</tbody>
				</Table>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	category: state.category.category,
});

const mapDispatchToProps = dispatch => ({
	getCategory: (id) => dispatch(actionCreators.getCategory(id)),
	searchProducts: (search, catalogId) => dispatch(actionCreators.searchProducts(search, catalogId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Catalog));
