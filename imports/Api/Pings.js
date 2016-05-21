import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Pings = new Mongo.Collection('pings');