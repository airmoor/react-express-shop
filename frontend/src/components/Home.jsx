import React from 'react';
import {Table,Button} from 'react-bootstrap';
import HomeCatalogItems from "./home/HomeCatalogItems";
import {NavLink, withRouter} from "react-router-dom";
import * as actionCreators from './../store/actions';
import { connect } from 'react-redux';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			catalogs: [],
			currentTutorial: null,
			currentIndex: -1,
			searchText: ""
		};
	}

	componentDidMount() {
		const { getCategories } = this.props;
		getCategories();
	}

	render() {
		const { categories } = this.props;

		return (
			<div>
				<div className="d-flex justify-content-between mb-4">
					<h1 className="text-left">
						Список каталогов
					</h1>

					<NavLink className="mb-3" to={'/catalog-new'}>
						<Button>
							Создать каталог
						</Button>
					</NavLink>
				</div>

				<Table bordered hover>
					<thead>
					<tr>
						<th>Название</th>
						<th>Количество</th>
						<th></th>
						<th></th>
					</tr>
					</thead>
					<tbody>
						<HomeCatalogItems catalogs={categories}/>
					</tbody>
				</Table>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	categories: state.category.categories,
});

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(actionCreators.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
