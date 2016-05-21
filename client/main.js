// import Pings from '../imports/Api/Pings.js'

Template.report.onCreated(() => {
	Meteor.subscribe('pings');
	Meteor.subscribe('reportsList');
	Meteor.subscribe('subscribers');
});

Template.report.helpers({
	ping() {
		var ping = Pings.findOne();
		console.log(ping.blinked);
		return Pings.findOne()
	},
	reports: function () {
		var array = [];

		var reports = Reports.find({}, {sort: {date: -1}});
		var reportsList = reports.fetch();

		// simulateFirstItemOpened(reportsList);

		return reports.count() > 0 ? reportsList : false;
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
		var current = this._id;
		return (this._id === current ) ? 'selected' : false;
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
		console.log(sub && sub.name);
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
	starSelected: function () {
		return reportUpVoteFilter.get();
	}
});

Template.report.events({
    "click .report_header": function (e, template) {
		var reportID = this._id;

		var parent = $("div").find("[data-id='" + reportID + "']");
        if (parent.hasClass('selected')) {
            $(parent).removeClass('selected');
            $(parent).children('.report-details-container').css('display', 'none');
            $(parent).children('.report_header').removeClass('selected');
        } else {
            $(parent).addClass('selected');
            $(parent).children('.report-details-container').css('display', 'block');
            $(parent).children('.report_header').addClass('selected');
        }
    }
});
