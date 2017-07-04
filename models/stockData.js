var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockData = new Schema({
	_id:{type:String,required:true},
	name:{type:String,required:true},
	data:{type:[]},
	color:{type:String,required:true}
},{
	_id:false
})

module.exports = mongoose.model('StockData',StockData)