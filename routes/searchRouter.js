var express = require('express');
var searchRouter = express.Router();
var config = require('../config.js');

searchRouter.post('/',function(req,res){
	res.json(req.body)
})

module.exports = searchRouter;