//server
var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

//database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/stockData'
mongoose.connect(url);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
	console.log('connected correctly to server');
})

//routers
var searchRouter = require('./routes/searchRouter');

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(__dirname + '/dist'));
app.use('/',express.static(__dirname + '/public'));

app.use('/search', searchRouter);

/*
app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})
*/

//ws
var WebSocket = require('ws');
var http = require('http');
var server = http.createServer(app);
var wss = new WebSocket.Server({server});
var module = require('./routes/wsRouter');

wss.on('connection',function connection(ws,req){

  //module.getDB(ws)
	console.log('Client connected');
	ws.on('message', function incoming(message) {

      if(message.match(/Add/) !== null){
        console.log('will %s',message)
        var regex = /\s\w*/;
        var stock = message.match(regex)[0].substr(1);
        module.getAPIdata(stock,ws)
      }
      else if(message.match(/Delete/) !== null){
        console.log('will %s',message)
        var regex = /\s\w*/;
        var stock = message.match(regex)[0].substr(1);
        module.deleteStock(stock,ws)
      }
      else{
        console.log('received: %s', message);
      }
  	});

  	ws.on('close', () => console.log('Client disconnected'));
  	//ws.send('hello client!');
})


server.listen(port,function listening(){
	console.log('Listening on %d',server.address().port)
})

