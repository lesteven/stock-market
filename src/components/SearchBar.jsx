import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchData} from '../redux/modules/searchModule';

class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state={
			searchTerm:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.search = this.search.bind(this);
	}
	handleChange(event){
		this.setState({searchTerm:event.target.value})
	}
	search(e){
		e.preventDefault();
		this.props.search(this.state.searchTerm)
	}
	render(){
		return(
			<form onSubmit={this.search}>
				<input type='text' name='searchTerm' 
				placeholder='Search Here!' value={this.state.searchTerm}
				onChange={this.handleChange}/>
				<input type='submit' value='Search'/>
			</form>
		)
	}
}

const mapStateToProps =(state)=>{
	return{
		search: state.term
	}
}
const mapDispatchToProps = (dispatch)=>{
	return{
		search:(term) => dispatch(fetchData(term))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)