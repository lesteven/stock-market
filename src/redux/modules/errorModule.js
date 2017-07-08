//action
export function gotError(error){
	return{
		type: 'ERROR',
		error
	}
}
export function noError(error){
	return{
		type: 'NO ERROR',
		error
	}
}
//reducer
export const err = (state='',action)=>{
	switch (action.type){
		case 'ERROR':
			return action.error
		case 'NO ERROR':
			return action.error
		default:
			return state;
	}
}

export default err