var express = require('express');
var searchRouter = express.Router();
var StockData = require('../models/stockData');


searchRouter.route('/')

.get(function(req,res){
	getDB(res)
})


function getDB(res){
	StockData.find({},function(err,stock){
		if (err) throw err;
		//console.log(stock)
		res.json({data:stock})
	})
}

module.exports = searchRouter;