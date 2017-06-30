var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockData = new Schema({
	id:{type:String,required:true},
	name:{type:String,required:true},
	data:{type:[]}
})

module.exports = mongoose.model('StockData',StockData)