import { Meteor } from 'meteor/meteor';

var blink = false;

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
	  // console.log('Updated with average:',gazeObject.avg);
	  if (gazeObject.fix) console.log('Fixed');
	  if (!blink && gazeObject.lefteye.psize == 0 && gazeObject.righteye.psize == 0) {
	  	blink = true;
	  	console.log('Blinked');
	  }
	  else if (blink && gazeObject.lefteye.psize > 0 && gazeObject.righteye.psize > 0) {
	  	blink = false
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
