Meteor.publish('pings',() => {
	return Pings.find({},{sort: {creationDate: -1}, limit: 1})
})

Meteor.publish('reportsList',() => {
    return Reports.find({},
        {
            fields: {metricSeriesID: 0,
                createdAt: 0,
                dailyMetricsID: 0,
                gaSegment: 0,
                previous: 0,
                previousNum: 0,
                current: 0,
                brief: 0
            },
            sort: {date: -1, sig: 1}
        });
});

Meteor.publish('subscribers',() => {
	return Subscribers.find({});
});
