import { Meteor } from 'meteor/meteor';
var Fiber  = Npm.require('fibers');
// import { moment } from 'meteor/moment';
// import Pings from '../imports/Api/Pings.js'
var blinked = false;
var fix = false, timer;

Meteor.startup(() => {
	// code to run on server at startup
	let EyeTribeClient = require('../imports/tet-node-client');
	let eye = new EyeTribeClient();
		eye.activate({
		host: 'localhost',
		port: 6555,
		mode: 'push',
		version: 1
	});

	eye.on('gazeUpdate', function (gazeObject) {
	  // do cool stuff

	  if(gazeObject.fix){
	  	console.log('fix');
	  	if (!fix) {
	  		fix = true
	  		timer = new Date()
	  	}
	  	else {
	  		if (moment(timer).subtract(150,'miliseconds') < moment()) {
	  		  Fiber(function(){
	  				Pings.insert({
		          	'x': gazeObject.avg.x,
		          	'y': gazeObject.avg.y,
		            'blinked': blinked,
		            'creationDate' : new Date()
	          		});
	  			}).run();
	  			// fiber.run();
	          	fix = false;
	  		}
	  	}
	  }
	});

	eye.on('connected', function () {
	  	// connected to tracker server
	  	console.log('Connected');
	});

	eye.on('disconnected', function (err) {
	  	// err not null if disconnected because of an error.
	  	if(err) return console.log(err);
		console.log('Disconnected');

	});

});
