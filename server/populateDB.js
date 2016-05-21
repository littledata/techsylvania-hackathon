Meteor.startup(function () {
    // Reports.remove({});
  if (Reports.find().count() === 0) {
    testReports.forEach(function (doc) {
      Reports.insert(doc);
    });
  }

  if (Subscribers.find().count() === 0) {
    testSubscriber.forEach(function (doc) {
      Subscribers.insert(doc);
    });
  }
});
