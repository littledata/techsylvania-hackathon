import { Meteor } from 'meteor/meteor';

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

	eye.on('gazeUpdate', function (x, y) {
	  // do cool stuff
	  console.log('Updated with x:',x,', y:', y, 'coordinates.');
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
