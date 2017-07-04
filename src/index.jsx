import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar.jsx';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import Graph from './components/graph.jsx';
import StocksList from './components/stocksList.jsx';

class Index extends Component{
	render(){
		
		return(
			<div>
				<Graph />
				<SearchBar />
				<StocksList />
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
