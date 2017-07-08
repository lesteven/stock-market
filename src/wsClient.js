var HOST = location.origin.replace(/^http/,'ws')
var proxy = 'ws://localhost:3000/'
var ws = new WebSocket(HOST);

module.exports = ws;
