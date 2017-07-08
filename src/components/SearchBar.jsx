import React, {Component} from 'react';
import {connect} from 'react-redux';
import {noError} from '../redux/modules/errorModule';
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
	errorMessage(){
		return(
			<p className='error' onClick={()=>this.props.noError('')}>
				Error! Please enter correct stock symbol
			</p>
		)
	}
	render(){
		return(
			<div>
			{this.props.err?this.errorMessage():null}
				<form onSubmit={this.addToGraph}>
					<input type='text' name='searchTerm' autoComplete='off'
					placeholder='Search Here!' value={this.state.searchTerm}
					onChange={this.handleChange}/>
					<input type='submit' value='Search'/>
				</form>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		err:state.err
	}
}
const mapDispatchToProps =(dispatch)=>{
	return{
		noError:(error)=>dispatch(noError(error))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);