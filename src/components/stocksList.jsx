import React, {Component} from 'react';
import { connect } from 'react-redux';
import Stocks from './stocks.jsx';

class StocksList extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let list;
		if(this.props.data){
			list =this.props.data.map(stock=>{
				return <Stocks 
						key ={stock._id}
						id = {stock._id}
						descrip = {stock.name}
						color={stock.color}
						/>
			})
		}
		return(
			<div className='stocksList'>
				{this.props.data?list:null}
			</div>
		)
	}
}

const mapStateToProps =(state)=>{
	return{
		data:state.data
	}
}


export default connect(mapStateToProps)(StocksList);