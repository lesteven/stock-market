//action
export function getStocks(stocks){
	return{
		type: 'STOCKS',
		stocks
	}
}

export function fetchDB(){
	return(dispatch)=>{
		
		fetch('/search')
		.then(response => response.json())
		.then(data =>{
			//let stocks = data.data.map(d=> [d._id,d.name])
			dispatch(getStocks(data.data))
		})
	}
}

//reducer
export const data = (state=[],action)=>{
	switch (action.type){
		case 'STOCKS':
			return action.stocks
		default:
			return state;
	}
}

export default data