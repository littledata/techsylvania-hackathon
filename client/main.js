// import Pings from '../imports/Api/Pings.js'

Template.report.onCreated(() => {
	Meteor.subscribe('pings');
})

Template.report.helpers({
	ping() {
		return Pings.findOne()
	}
})