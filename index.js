/**
 * Module dependencies
 */

var host = process.env.SOCKET_HOST || 'http://localhost:3000';
var debug = require('debug')('balance-game:arduino-client');
var socket = require('socket.io-client')(host, {transports: ['websocket']});
var Arduino = require('arduino-client');
var throttle = require('throttleit');
var arduino = new Arduino();

/**
 * Throttle onchange
 */

var onchange = throttle(function(entry){
  if (arduino.isReady) {
    debug(entry);
    if(entry.x) {
      var deg = arduino.send(entry);
      debug(deg);
      socket.emit('degree', deg);
    }
  }
}, 10);

socket.on('connect', function(){
  debug('connected');
  socket.on('change', onchange);
  socket.on('disconnect-socket', function(entry){
    debug('remove entry', entry);
    arduino.removeById(entry.id);
  });
});

socket.on('connect_error', function(e){
  debug(e);
});

