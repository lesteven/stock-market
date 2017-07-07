var express = require('express');
var searchRouter = express.Router();
var axios =require('axios');
var config = require('../config.js');
var StockData = require('../models/stockData');


searchRouter.route('/')

.get(function(req,res){
	getDB(res)
})

.post(function(req,res){
	getAPIdata(req,res)
})

.delete(function(req,res){
	deleteStock(req,res)
})

function getDB(res){
	StockData.find({},function(err,stock){
		if (err) throw err;
		//console.log(stock)
		res.json({data:stock})
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
function addStockToDb(data,req,res){
	var stocks = ({
		_id: data.dataset_code,
		name: data.name,
		data: data.data,
		color: genColor()
	})

	StockData.create(stocks,function(err,stock){
		if(err) throw err;
		console.log(stock._id)
		res.json(req.body)
	})
}
function getAPIdata(req,res){
	var url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
	url += req.body.term;
	url += '.json?column_index=1&start_date=' + getStartDate();
	//url += '&collapse=monthly';
	url += '&api_key=' + config.KEY;

	axios.get(url)
	.then(response => {
		addStockToDb(response.data.dataset,req,res)
		//console.log(response.data.dataset.dataset_code)
	})
}
function deleteStock(req,res){
	StockData.findByIdAndRemove({_id:req.body._id},function(err,stock){
		if(err) throw err;
		res.json({'status':'success'})
	})
}
module.exports = searchRouter;