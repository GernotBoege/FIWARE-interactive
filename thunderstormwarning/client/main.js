SensorDataSet = new Mongo.Collection('sensordataset');

Meteor.subscribe('sensordataset');

Template.body.helpers({
    SonsorOCBAPIData: function() {
        return SensorDataSet.findOne();
    }
});