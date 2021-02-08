import React from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from 'react-router-dom';
import {withRouter} from "react-router";
import * as actionCreators from "../store/actions";
import {connect} from "react-redux";

class ProductCreate extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeBrand = this.onChangeBrand.bind(this);
		this.onChangePrice = this.onChangePrice.bind(this);
		this.onChangeModel = this.onChangeModel.bind(this);
		this.saveProduct = this.saveProduct.bind(this);

		this.state = {
			id: null,
			title: "",
			description: "",
			categoryId: null,
			brand: "",
			model: "",
			price: '',
			validated: false
		};
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

	validate() {
		if (this.state.title &&
			this.state.brand &&
			this.state.model &&
			this.state.price &&
			typeof (this.state.price === 'Number') ) return true;
		else return false;
	}

	saveProduct() {
		this.setState({
			validated: true
		});

		if (!this.validate()) return;

		let data = {
			title: this.state.title,
			description: this.state.description,
			categoryId: this.props.match.params.id,
			model: this.state.model,
			brand: this.state.brand,
			price: this.state.price,
		};

		this.props.createProduct(data)
			.then(()=> {
				this.props.history.push('/catalog/' + this.props.match.params.id);
			})
	}

	render() {
		return (
			<div className='catalog'>
				<h1>Новый продукт </h1>
				<Form noValidate validated={this.state.validated}>
					<Form.Group>
						<Form.Label htmlFor="inlineFormInput" srOnly>
							Название
						</Form.Label>
						<Form.Control
							required
							className="mb-2"
							value={this.state.title}
							onChange={this.onChangeTitle}
							placeholder="Название"
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="inlineFormInput" srOnly>
							Бренд
						</Form.Label>
						<Form.Control
							required
							className="mb-2"
							onChange={this.onChangeBrand}
							value={this.state.brand}
							placeholder="Бренд"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor="inlineFormInput" srOnly>
							Модель
						</Form.Label>

						<Form.Control
							required
							onChange={this.onChangeModel}
							className="mb-2"
							value={this.state.model}
							placeholder="Модель"
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="inlineFormInput" srOnly>
							Цена
						</Form.Label>
						<Form.Control
							required
							onChange={this.onChangePrice}
							className="mb-2"
							value={this.state.price}
							type="number"
							placeholder="Цена"
						/>
						<Form.Control.Feedback type="invalid">
							Цена должна быть числом
						</Form.Control.Feedback>
					</Form.Group>

					<NavLink className="mr-5" to={'/catalog/' + this.props.match.params.id}>
						<Button variant="light">Отмена </Button>
					</NavLink>

					<Button onClick={this.saveProduct} variant="success">
						Создать
					</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	product: state.category.product,
});

const mapDispatchToProps = dispatch => ({
	createProduct: (data) => dispatch(actionCreators.createProduct(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductCreate));