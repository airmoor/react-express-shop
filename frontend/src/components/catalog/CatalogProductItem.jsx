import React from 'react';
import {NavLink} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {withRouter} from "react-router";
import * as actionCreators from "../../store/actions";
import {connect} from "react-redux";

class CatalogProductItem extends React.Component {
	constructor(props) {
		super(props);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.state = {
			product: this.props.product,
			id: this.props.match.params.id,
			link: '/catalog/' + this.props.match.params.id + '/product/' + this.props.product.id + '/edit'
		};
	}

	deleteProduct() {

		const id = this.state.product.id;
		const categoryId = this.state.product.categoryId;

		this.props.deleteProduct(id).then(()=> {
			this.props.getCategory(categoryId);
		})
	}

	render() {
		return (
			<tr>
				<td>{this.state.product.title}</td>
				<td>{this.state.product.brand}</td>
				<td>{this.state.product.model}</td>
				<td>{this.state.product.price}</td>
				<td>
					<NavLink to={this.state.link}>
						Редактировать
					</NavLink>
				</td>
				<td>
					<Button onClick={this.deleteProduct}
					        variant="outline-danger">
						Удалить
					</Button>
				</td>
			</tr>
		)
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
	deleteProduct: (id) => dispatch(actionCreators.deleteProduct(id)),
	getCategory: (id) => dispatch(actionCreators.getCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogProductItem));