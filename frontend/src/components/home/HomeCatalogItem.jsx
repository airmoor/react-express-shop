import React from 'react';
import {NavLink} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import * as actionCreators from "../../store/actions";
import {connect} from "react-redux";

class HomeCatalogItem extends React.Component {

	constructor(props) {
		super(props);

		this.deleteCategory = this.deleteCategory.bind(this);
		this.state = {
			catalog: this.props.catalog
		};
	}

	deleteCategory() {
		const id = this.state.catalog.id;
		this.props.deleteCategory(id).then(()=> {
			this.props.getCategories();
		})
	}

	render() {
		return (
			<tr>
				<td>
					<NavLink to={'/catalog/' + this.state.catalog.id}>
						{this.state.catalog.title}
					</NavLink>
				</td>
				<td>{this.state.catalog.productscount}</td>
				<td>
					<NavLink to={'/catalog/' + this.state.catalog.id + '/edit'}>
						Редактировать
					</NavLink>
				</td>
				<td>
					<Button onClick={this.deleteCategory} variant="outline-danger">
						Удалить
					</Button>
				</td>
			</tr>
		)
	}
}


const mapStateToProps = state => ({
	// category: state.category.category,
});

const mapDispatchToProps = dispatch => ({
	deleteCategory: (id) => dispatch(actionCreators.deleteCategory(id)),
	getCategories: () => dispatch(actionCreators.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeCatalogItem);