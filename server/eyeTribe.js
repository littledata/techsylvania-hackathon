import { Meteor } from 'meteor/meteor';
var Fiber  = Npm.require('fibers');
// import { moment } from 'meteor/moment';
// import Pings from '../imports/Api/Pings.js'
var fix = false, timer;
var blinked = false;
const xFix = [], yFix = [];

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
	  // console.log('Updated with average:',gazeObject.avg);
	  // if (gazeObject.fix) console.log('Fixed');

	  if(gazeObject.fix){
	  	if (!fix) {
	  		fix = true
	  		timer = new Date()
	  		if (gazeObject.lefteye.psize == 0 && gazeObject.righteye.psize == 0) {
			  	blinked = 'both';
			  } else if (gazeObject.righteye.psize == 0) {
			  	blinked = 'right';
			  } else if(gazeObject.lefteye.psize == 0) {
			  	blinked = 'left';
			  }
	  	}
	  	else {
	  		if (moment(timer).subtract(200,'milliseconds') < moment()) {
	  		  Fiber(function(){
	  				Pings.insert({
		          	'x': gazeObject.avg.x,
		          	'y': gazeObject.avg.y,
		            'blinked': blinked,
		            'creationDate' : new Date()
	          		});
	  			}).run();
	          	fix = false, blinked = false;
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
