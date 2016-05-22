// browserHeader = window.outerHeight - window.innerHeight;
browserHeader = 0;

// import Pings from '../imports/Api/Pings.js'

Template.report.onCreated(() => {
	Meteor.subscribe('pings');
	Meteor.subscribe('reportsList');
	Meteor.subscribe('subscribers');
});

Template.report.helpers({
	ping() {
		var ping = Pings.findOne();
		return Pings.findOne()
	},
	x() {
		return this.x + window.scrollX;
	},
	y() {
		var adjusted = this.y - browserHeader;
		adjusted = (adjusted < 0) ? 0 : adjusted;
		return adjusted + window.scrollY
	},
	reports: function () {
		var array = [];

		return Reports.find({}, {sort: {date: -1}});

	},
	statement: function () {
		if (typeof this.statement == 'string') {
			var title = this.statement;
			var percent = title.match(/\d*\.?(\d+%|\d+x)/g);

			if (percent && (this.type == "Overall" || this.type == "Trending pages")) {
				t = title.split(percent);
				var reportTitle = t[0] + "<span class='" + this.impact + "'>" + percent[0] + "</span>";
			} else {
				var reportTitle = title;
			}
			return reportTitle
		}
		else return 'Just expand me'
	},
	periodType: function(){
		var periodType = this.periodType;
		if(this.type == "Overall"){
			return periodType
		}
		return periodType
	},
	selected: function () {
		return false
		// var current = this._id;
		// var current = 'DNe2oPr6bA4321SXu';
		// return (this._id === current ) ? 'selected' : false;
	},
	// hasRead: function () {
		// var read = _.contains(this.read, Meteor.userId());
		// return (read ? 'read' : '');
	// },
	date: function () {
		return moment(this.date).format('DD MMM')
	},
	sigWord: function () {
		var p = this.sig;
		if (typeof p != 'number' || p > 0.1) return "";
		if (p > 0.01) return "Moderately";
		if (p > 0.001) return "Highly";
		else return "Extremely";
	},
	chanceStatement: function () {
		// return generateOneInChance(this.pChange);
	},
	long: function () {
		return (this.statement.length > 94) ? 'long' : '';
	},
	anyReports: function () {
		return (Reports.find().count() > 0);
	},
	upStar: function () {
		// return _.contains(this.upVoted, Meteor.userId()) ? 'star-up' : ''
	},
	subName: function () {
		var sub = Subscribers.findOne({viewID: this.viewID});
		return sub && sub.name
	},
	reportTemplateName: function () {
		var reportTemplate = "report_" + this.type.toLowerCase();
		reportTemplate = reportTemplate.replace(' ', '_');
		return reportTemplate;
	},
	tip: function () {
		return this.type == 'Tip';
	},
	metric: function () {
		return (metric.slice(0, 4) == 'goal') ? 'goal conversions' : metric
	},
	upStar: function() {
		return (this.starred == true) ? 'star-up' : ''
	}
});
