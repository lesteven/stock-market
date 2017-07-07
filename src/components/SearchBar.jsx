import React, {Component} from 'react';
var ws = require('../wsClient');


class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state={
			searchTerm:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.addToGraph = this.addToGraph.bind(this);
	}
	handleChange(event){
		this.setState({searchTerm:event.target.value})
	}
	addToGraph(e){
		e.preventDefault();
		ws.send('Add ' + this.state.searchTerm)
		this.setState({searchTerm:''})
	}
	render(){
	
		return(
			<form onSubmit={this.addToGraph}>
				<input type='text' name='searchTerm' 
				placeholder='Search Here!' value={this.state.searchTerm}
				onChange={this.handleChange}/>
				<input type='submit' value='Search'/>
			</form>
		)
	}
}


export default SearchBar