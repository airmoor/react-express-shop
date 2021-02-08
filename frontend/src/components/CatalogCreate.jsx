import React from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from 'react-router-dom';
import {withRouter} from "react-router";
import * as actionCreators from "../store/actions";
import {connect} from "react-redux";
import {isCategoryTitleExists} from "../services/check-unique";

class CatalogCreate extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.createCatalog = this.createCatalog.bind(this);

		this.state = {
			id: null,
			title: "",
			description: "",
			published: false,
			submitted: false,
			validated:false,
			isTitleExists:false,
		};
	}

	onChangeTitle(e) {
		this.setState({
			title: e.target.value
		});
		console.log('hueta', isCategoryTitleExists(e.target.value))
		this.setState({
			isTitleExists: isCategoryTitleExists(e.target.value)
		});
	}


	onChangeDescription(e) {
		this.setState({
			description: e.target.value
		});
	}

	createCatalog() {
		let data = {
			title: this.state.title,
			description: this.state.description
		};
		this.props.createCategory(data)
			.then(()=> {
				this.props.history.push('/');
			})
	}

	render() {
		return (
			<div className='catalog'>
				<h1>Новый каталог </h1>
				<Form className="" >
					<Form.Label htmlFor="inlineFormInput" srOnly>
						Название
					</Form.Label>
					<Form.Control onChange={this.onChangeTitle}
					              className="mb-2"
					              value={this.state.title}
					              placeholder="Название"
					/>
					{
						this.state.isTitleExists &&
						<Form.Control.Feedback type="invalid">
							Это название уже существует
						</Form.Control.Feedback>
					}

					
					<Form.Label htmlFor="inlineFormInput" srOnly>
						Описание
					</Form.Label>
					<Form.Control onChange={this.onChangeDescription}
					              className="mb-2"
					              value={this.state.description}
					              placeholder="Описание"
					/>

					<NavLink className="mr-5" to={'/'}>
						<Button variant="light">Отмена </Button>
					</NavLink>

					<Button onClick={this.createCatalog} variant="success">
						Создать
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
	createCategory: (data) => dispatch(actionCreators.createCategory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogCreate));