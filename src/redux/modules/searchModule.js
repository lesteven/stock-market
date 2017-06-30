var qs = require('querystring');
//action

export function searchStocks(term,data){
	return{
		type: 'TERM',
		term,
		data
	}
}

export function fetchData(term){
	return (dispatch)=>{
		var formData ={
			term:term
		}
		fetch('/search',{
			method: 'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: qs.stringify(formData)
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)
			dispatch(searchStocks(term))
		})
	}
}

//reducer
export const search = (state={term:'',data:''},action)=>{
	switch (action.type){
		case 'TERM':
			return {term:action.term, data:action.data}
		default:
			return state;
	}
}

export default search