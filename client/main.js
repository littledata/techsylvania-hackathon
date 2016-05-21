<<<<<<< Updated upstream
// import Pings from '../imports/Api/Pings.js'

Template.report.onCreated(() => {
	Meteor.subscribe('pings');
})

Template.report.helpers({
	ping() {
		return Pings.findOne()
	}
})
=======
Template.report.helpers({
    reports() {
        return [
            {   _id: 1,
                statement: 'Sessions increased by 51%',
                periodType: 'month',
                date: '20 May'
            },
            {   _id: 2,
                statement: 'Sessions rose by 20%',
                periodType: 'week',
                date: '14 May'
            },
            {   _id: 3,
                statement: 'Sessions from natural search rose by 33%',
                periodType: 'week',
                date: '14 May'
            },
            {   _id: 4,
                statement: 'Pages per session rose by 46%',
                periodType: 'day',
                date: '14 May'
            },
            {   _id: 5,
                statement: 'Bounce rate from natural search fell by 3%',
                periodType: 'week',
                date: '14 May'
            },
            {   _id: 6,
                statement: 'Pages per session from direct traffic increased 3x',
                periodType: 'month',
                date: '13 May'
            }
        ]
    }
});

Template.report.events({
    "click .report_header": function (e, template) {
        var selected = '';

        if (selected) {
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
    }//,
    // "click .star": function (e, template) {
    //     if (!Meteor.user()) {
    //         var params = {
    //             animation: true,
    //             html: true,
    //             placement: 'bottom',
    //             trigger: 'click',
    //             template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
    //             delay: {show: 250, hide: 0}
    //         };
    //
    //         if ($(e.target).next('div.popover:visible').length) {
    //             $(e.target).popover('hide');
    //         } else {
    //             $(e.target).popover(params).popover('show');
    //         }
    //     } else {
    //         e.stopPropagation();
    //         if ($(e.target).parent().hasClass('star-up')) {
    //             Reports.update(this._id, {$pull: {upVoted: Meteor.userId()}});
    //         } else {
    //             if (!this.upVoted) {
    //                 Reports.update(this._id, {$set: {upVoted: [Meteor.userId()]}});
    //             }
    //             else {
    //                 Reports.update(this._id, {$addToSet: {upVoted: Meteor.userId()}});
    //             }
    //         }
    //     }
    // }
});
>>>>>>> Stashed changes
