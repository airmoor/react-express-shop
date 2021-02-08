import React from 'react';
import {NavLink} from 'react-router-dom';
import { Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import * as actionCreators from "../store/actions";
import {connect} from "react-redux";

class CatalogEdit extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.updateCatalog = this.updateCatalog.bind(this);

		this.state = {
			id: null,
			title: "",
			description: "",
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getCategory(id).then(()=> {
			this.setState({
				title: this.props.category.title,
				description: this.props.category.description
			});
		})
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

	updateCatalog() {
		const id = this.props.match.params.id;

		let data = {
			title: this.state.title,
			description: this.state.description
		};

		this.props.updateCategory(id, data).then(()=> {
			this.props.getCategories().then(()=> {
				this.props.history.push('/');
			})
		})
	}

	render() {
		return (
			<div>
				<h1>Редактировать каталог </h1>
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
						onChange={this.onChangeDescription}
						value={this.state.description}
						placeholder="Описание"
					/>

					<NavLink className="mr-5" to={'/'}>
						<Button variant="light">
							Отменить
						</Button>
					</NavLink>
					<Button onClick={this.updateCatalog} variant="success">
						Обновить
					</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	category: state.category.category,
});

const mapDispatchToProps = dispatch => ({
	getCategory: (id) => dispatch(actionCreators.getCategory(id)),
	updateCategory: (id, data) => dispatch(actionCreators.updateCategory(id, data)),
	getCategories: () => dispatch(actionCreators.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogEdit));