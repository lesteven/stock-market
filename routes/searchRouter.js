var express = require('express');
var searchRouter = express.Router();
var axios =require('axios');
var config = require('../config.js');


searchRouter.post('/',function(req,res){
	getStockData(req.body.term)
	res.json(req.body)
})

function getStartDate(){
	var date = new Date()
	var day = String(date.getDate());
	var month = String(date.getMonth()+1);
	var year = String(date.getFullYear()-1);
	var fullDate = year + '-'+ month + '-' + day
	return fullDate;
}
function getStockData(company){
	var url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
	url += company;
	url += '.json?column_index=1&start_date=' + getStartDate();
	url += '&api_key=' + config.KEY;

	axios.get(url)
	.then(response => console.log(
		response.data.dataset.dataset_code,
		//response.data.dataset.data
		response))
}
module.exports = searchRouter;