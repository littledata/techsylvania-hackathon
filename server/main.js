import { Meteor } from 'meteor/meteor';
import { Pings } from '../imports/Api/Pings.js'
var blink = false;
var fix = false;

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
	  if (gazeObject.fix){
	  	Meteor.clearTimeout();
	  	fix = true;
	  } 

	  if (!blink && gazeObject.lefteye.psize == 0 && gazeObject.righteye.psize == 0) {
	  	blink = 'both';
	  	Pings.insert({
        	'x':x,
        	'y':y,
            'blinked': blinked,
            'creationDate' : new Date()
        });
	  }
	  else if (blink && gazeObject.lefteye.psize > 0 && gazeObject.righteye.psize == 0) {
	  	blink = 'right'; //signal not to introduce in DB
	  }
	  else if(blink && gazeObject.lefteye.psize == 0 && gazeObject.righteye.psize > 0) {
	  	blink = 'left';
	  }
	  else {
	  	blink = false;
	  }

	  if(!fix){
	  	  Meteor.setTimeout(()=>{
	  	  	Pings.insert({
	  	  		'x' : gazeObject.avgX,
	  	  		'y' : gazeObject.avgY,
	  	  		'fixed': fixed
	  	  	})
	  	  	
	  	  },200)
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
