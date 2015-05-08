#!/usr/bin/env node

var path = require('path')
	, express = require('express')
	, keypress = require('keypress')
	, open = require('open')
	, portfinder = require('portfinder')
	, app = express()
	, target

keypress(process.stdin)

process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl) {
  	switch(key.name) {
  		case 'o':
  			open(target)
  			break
			case 'c':
				process.exit(0)
				break
  	}
  }
})

process.stdin.setRawMode(true)
process.stdin.resume()
portfinder.basePort = 3000

app.use('/', express.static(process.cwd()))

portfinder.getPort(function(err, port) {

	target = 'http://localhost:' + port

	app.listen(port)

	console.log('server started: ' + target)
	console.log('-----')
	console.log('ctrl + o to open browser')
	console.log('ctrl + c to exit')
	console.log('-----')

})