import React from 'react';
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";
import {withRouter} from "react-router";
import {NavLink} from "react-router-dom";
import * as actionCreators from "../store/actions";
import {connect} from "react-redux";

class ProductEdit extends React.Component {

	constructor(props) {
		super(props);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeBrand = this.onChangeBrand.bind(this);
		this.onChangePrice = this.onChangePrice.bind(this);
		this.onChangeModel = this.onChangeModel.bind(this);
		this.updateProduct = this.updateProduct.bind(this);
		this.getProduct = this.getProduct.bind(this);

		this.state = {
			id: null,
			title: "",
			description: "",
			categoryId: null,
			brand: "",
			model: "",
			price: '',
		};
	}

	componentDidMount() {
		this.getProduct();
	}

	getProduct() {
		const id = this.props.match.params.productId;

		this.props.getProduct(id).then(() => {
			this.setState({
				title: this.props.product.title,
				description: this.props.product.description,
				brand: this.props.product.brand,
				model: this.props.product.model,
				price: this.props.product.price,
			});
		})
	}

	onChangeTitle(e) {
		this.setState({
			title: e.target.value
		});
	}

	onChangeBrand(e) {
		this.setState({
			brand: e.target.value
		});
	}

	onChangePrice(e) {
		this.setState({
			price: e.target.value
		});
	}

	onChangeModel(e) {
		this.setState({
			model: e.target.value
		});
	}

	updateProduct() {
		const id = this.props.match.params.productId;
		const categoryId = this.props.match.params.id;

		let data = {
			title: this.state.title,
			description: this.state.description,
			brand: this.state.brand,
			model: this.state.model,
			price: this.state.price,
		};

		this.props.updateProduct(id, data)
			.then(() => {
				this.props.getCategory(categoryId).then(() => {
					this.props.history.goBack();
				})
			})
	}

	render() {
		return (
			<div className='catalog'>
				<h1>Редактировать продукт </h1>
				<Form className="">

					<Form.Label htmlFor="inlineFormInput" srOnly>
						Название
					</Form.Label>
					<Form.Control
						className="mb-2"
						value={this.state.title}
						onChange={this.onChangeTitle}
						placeholder="Название"
					/>

					<Form.Label htmlFor="inlineFormInput" srOnly>
						Описание
					</Form.Label>
					<Form.Control
						className="mb-2"
						onChange={this.onChangeBrand}
						value={this.state.brand}
						placeholder="brand"
					/>

					<Form.Label htmlFor="inlineFormInput" srOnly>
						Модель
					</Form.Label>
					<Form.Control
						onChange={this.onChangeModel}
						className="mb-2"
						value={this.state.model}
						placeholder="model"
					/>

					<Form.Label htmlFor="inlineFormInput" srOnly>
						Цена
					</Form.Label>
					<Form.Control
						onChange={this.onChangePrice}
						className="mb-2"
						value={this.state.price}
						placeholder="price"
					/>

					<NavLink className="mr-5"
					         to={'/catalog/' + this.props.match.params.id}>
						<Button variant="light">Отменить</Button>
					</NavLink>
					<Button onClick={this.updateProduct} variant="success">
						Обновить
					</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	product: state.product.product,
});

const mapDispatchToProps = dispatch => ({
	getProduct: (id) => dispatch(actionCreators.getProduct(id)),
	updateProduct: (id, data) => dispatch(actionCreators.updateProduct(id, data)),
	getCategory: (id) => dispatch(actionCreators.getCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductEdit));