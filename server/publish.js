Meteor.publish('pings',() => {
	return Pings.find({},{sort: {creationDate: -1}, limit: 1})
})