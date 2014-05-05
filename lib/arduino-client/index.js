/**
 * Module dependencies
 */

var map = require('remap');
var each = require('lodash').each;
var five = require("johnny-five");
var port = process.env.USB_PORT || "/dev/tty.usbmodem1421";
var servoPin = process.env.SERVO_PIN || 9;

/**
 * Expose `arduino-client`
 */

module.exports = ArduinoClient;

function ArduinoClient() {

  this.board = new five.Board({ port: port });
  this.board.on('ready', this.onready.bind(this));

  this.axis = 'y'; // Which axis are you using for tilt?
  this.smooth = {};
  this.isReady = false;
  this.smoothLimit = 5;
  this.degreePadding = 10;

}

/**
 * When Arduino is ready
 */

ArduinoClient.prototype.onready = function(){
  this.isReady = true;
  this.setup();
};

/**
 * Remove smooth entry by id
 *
 * @param {String} id
 */

ArduinoClient.prototype.removeById = function(id){
  delete this.smooth[id];
};

ArduinoClient.prototype.setup = function(){
  this.servo = new five.Servo(servoPin);
  this.servo.to(90);
};


/**
 * Send degree data to arduino
 *
 * @param {Object} data
 * @return {Number} degree
 *
 */

ArduinoClient.prototype.send = function(data){

  var id = data.id;
  var axis = this.axis;
  var value = 0;
  var padding = this.degreePadding;
  var degree;
  var userCount;

  this.smooth[id] = this.smooth[id] || { x: [], y: [], z: [] };
  this.smooth[id][axis].push(data[axis]);

  if(this.smooth[id][axis].length >= this.smoothLimit) {
    this.smooth[id][axis].shift();
  }

  userCount = Object.keys(this.smooth).length;

  each(this.smooth, function(id, k){
    var userSmooth = 0;
    k[axis].forEach(function(_v){
      userSmooth += _v;
    });
    userSmooth /= k[axis].length;
    smoothList.push(userSmooth);
  });
  
  smoothList.forEach(function(v){
    value += v;
  });
  value /= userCount;

  degree = map(value, -9.8, 9.8, 90 + padding, 90 - padding);
  
  // TODO: Servo seems doesn't function correctly...
  if(degree > 90) {
    degree = map(degree, 90, 90 + padding, 90, 90 + padding + 7.5);
  }

  degree = Math.round(degree);

  this.servo.to(degree);

  return degree;
};
