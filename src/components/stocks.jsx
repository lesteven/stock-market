import React, {Component} from 'react';

class Stocks extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='stock'>
				<h3 style={{color:this.props.color}}>
					{this.props.id}
				</h3>
				<p>{this.props.descrip}</p>
			</div>
		)
	}
}

export default Stocks;