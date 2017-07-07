var axios =require('axios');
var config = require('../config.js');
var StockData = require('../models/stockData');

exports.getDB =(ws)=>{
	StockData.find({},function(err,stock){
		if (err) throw err;
		ws.send(JSON.stringify(stock))
	})
}
function getStartDate(){
	var date = new Date()
	var day = String(date.getDate());
	var month = String(date.getMonth()+1);
	var year = String(date.getFullYear()-1);
	var fullDate = year + '-'+ month + '-' + day
	return fullDate;
}
function genColor(){
	  let letters = '0123456789abcdef';
	  let color = '#';
	  for(let i = 0; i <6; i++){
	    color += letters[Math.floor(Math.random()*letters.length)]
	  }
	  return color; 
	}
function addStockToDb(data,ws){
	var stocks = ({
		_id: data.dataset_code,
		name: data.name,
		data: data.data,
		color: genColor()
	})

	StockData.create(stocks,function(err,stock){
		if(err) throw err;
		console.log(stock._id)
		exports.getDB(ws)
	})
}
exports.getAPIdata =(stock,ws)=>{
	var url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
	url += stock
	url += '.json?column_index=1&start_date=' + getStartDate();
	//url += '&collapse=monthly';
	url += '&api_key=' + config.KEY;

	axios.get(url)
	.then(response => {
		addStockToDb(response.data.dataset,ws)
		//console.log(response.data.dataset.dataset_code)
	})
}
exports.deleteStock=(stock,ws)=>{
	StockData.findByIdAndRemove({_id:stock},function(err,stock){
		if(err) throw err;
		exports.getDB(ws)
	})
}