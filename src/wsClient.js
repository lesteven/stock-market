var HOST = location.origin.replace(/^http/,'ws')
var ws = new WebSocket('ws://localhost:3000/');

module.exports = ws;
