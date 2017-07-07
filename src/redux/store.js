import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import data from './modules/stocksModule';

const reducers = combineReducers({
	data
})

export default function configureStore(initialState){
	return createStore(
		reducers,
		initialState,
		compose(
			applyMiddleware(thunk),
			window.devToolsExtension? window.devToolsExtension():f=>f
		)
	)
	
}