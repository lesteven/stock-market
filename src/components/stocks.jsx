import React, {Component} from 'react';
var qs = require('querystring');
var ws = require('../wsClient');


class Stocks extends Component{
	constructor(props){
		super(props);
	}
	deleteStock(id){
		ws.send('Delete ' + id);
	}
	render(){
		return(
			<div className='stock'>
				<span className='header'>
					<button onClick={()=>this.deleteStock(this.props.id)}
					className='remove'>Remove</button>
					<h3 className='title'
					style={{color:this.props.color}}>
						{this.props.id}
					</h3>
				</span>
				<p>{this.props.descrip}</p>
			</div>
		)
	}
}

export default Stocks;