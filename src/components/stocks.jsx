import React, {Component} from 'react';
var qs = require('querystring');

class Stocks extends Component{
	constructor(props){
		super(props);
	}
	deleteStock(id){
		let formData ={
			_id:id
		}
		fetch('/search',{
			credentials:'same-origin',
			method:'DELETE',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(formData)
		})
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