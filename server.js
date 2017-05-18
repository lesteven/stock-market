var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
var port = process.env.PORT || 3000;



app.use('/',express.static(__dirname + '/public'));

app.use('/goodbye',function(req,res){
	res.send('goodbye world!')
})


app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})

