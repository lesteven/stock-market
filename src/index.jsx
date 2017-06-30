import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar.jsx'
import {Provider} from 'react-redux';
import configureStore from './redux/store';

class Index extends Component{
	render(){
		return(
			<div>
				<SearchBar />
			</div>
		)
	}
}

const store = configureStore();

ReactDOM.render(
	<Provider store ={store}>
		<Index />
	</Provider>,
	document.getElementById('index'));
