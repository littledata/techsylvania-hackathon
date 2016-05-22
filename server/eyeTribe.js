import { Meteor } from 'meteor/meteor';
var Fiber  = Npm.require('fibers');
// import { moment } from 'meteor/moment';
// import Pings from '../imports/Api/Pings.js'
var fix = false, timer, blinkTimer;
var blink = false;
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
	  	}
	  	else {
	  		if (moment(timer).add(200,'milliseconds') < moment()) {
	  		  Fiber(function(){
	  				Pings.insert({
		          	'x': xFix.sum() / xFix.count(),
		          	'y': yFix.sum() / yFix.count(),
		            'blinked': blink,
		            'creationDate' : new Date()
	          		});
	  			}).run();
	          	fix = false;
	  		}
	  		else {
	  			xFix.push(gazeObject.avg.x)
	  			yFix.push(gazeObject.avg.y)
	  		}
	  	}
	  }
	  var psizeL = gazeObject.lefteye.psize;
	  var psizeR = gazeObject.righteye.psize;

	  if (!blink && (psizeL == 0 || psizeR == 0)) {
	  	if (psizeL + psizeR == 0) return; // not counting both eyes
	  	blink = (psizeL == 0) ? 'left' : 'right'
	  	blinkTimer = new Date()
	  }
	  else if (psizeL > 0.1 && psizeR > 0.1) {
	  	blink = false
	  }
	  else {
	  	if (moment(blinkTimer).add(400,'milliseconds') < moment()) {
	  		console.log(blink)
	  		  Fiber(function(){
	  				Pings.insert({
		          	'x': gazeObject.avg.x,
		          	'y': gazeObject.avg.y,
		            'blinked': blink,
		            'creationDate' : new Date()
	          		});
	  			}).run();
	          	fix = false, blink = false;
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
