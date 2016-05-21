import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Pings = new Mongo.Collection('pings');


Pings.insert({
        	'x':x,
        	'y':y,
            'blinked': blinked,
            'creationDate' : new Date()
        });