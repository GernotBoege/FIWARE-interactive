Meteor.publish('sensordataset', function() {
    var self = this;
    var publishedKeys = {};
    var poll = function () {
        try {
            var response = HTTP.get('http://81.14.183.156:1026/v2/entities?idPattern=SCS-001', {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
            console.log(response.data[0]);
            _.each(response.data, function(item) {
                var doc = {
                    id: item.id,
                    type: item.type,
                    brightness: item.brightness.value,
                    temperature_c: item.temperature_c.value,
                    thunderstorm_color: item.thunderstorm_color.value,
                    thunderstorm_warning: item.thunderstorm_warning.value,
                    timestamp_rcvd: item.timestamp_rcvd.value
                };
                if (publishedKeys[item.id]) {
                    self.changed('sensordataset', item.id, doc);
                } else {
                    publishedKeys[item.id] = true;
                    self.added('sensordataset', item.id, doc);
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    };
    poll();
    self.ready();
    var interval = Meteor.setInterval(poll, 5000);
    self.onStop( function () {
        Meteor.clearInterval(interval);
    });
});
