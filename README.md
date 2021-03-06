# sfpc-seesaw-arduino
  
  *The arduino client for the seesaw project for SFPC final.*
  
  It will be responsible for recieving the tilt infomation from this app and reflecting the change on arduino's servo.

  Setting up the arduino is as simple as plugging servo to PIN 9.

  Use in combination with [sfpc-seesaw](https://github.com/mnmly/sfpc-seesaw).
  
  ![](http://c.mnmly.com/Ve5d/diagram.gif)

## Installation

    # This app requires you have node 0.11.11 installed.
    # Install node version manager `n` if you don't have one
    $ npm install n --global
    $ n 0.10.25

    $ npm install .

### Running an app

#### On local

    $ cd /path/to/sfpc-seesaw
    $ make serve

    $ cd /path/to/sfpc-seesaw-arduino
    $ make serve

    # If you want to use different USB Port us e`USB_PORT` env.
    $ USB_PORT=/dev/tty.usbmodem1421 make serve

#### On server
    
    $ cd /path/to/sfpc-seesaw-arduino
    # Point the end point using `SOCKET_HOST` env.
    $ SOCKET_HOST=http://example.com make serve

## LICENSE
  MIT

