f// Import the interface to Tessel hardware
var tessel = require('tessel');

var http = require('http');

var postData = JSON.stringify({
    "id": "SCS-001",
    "type": "SmartCitySensor",
    "owner": {
        "value": "Netzlink",
        "type": "String"
    },
    "hardware": {
        "value": "Tessel2",
        "type": "String"
    },
    "temperature_c": {
        "value": 0,
        "type": "Float"
    },
    "brightness": {
        "value": 0,
        "type": "Float"
    },
    "humidity": {
        "value": 0,
        "type": "Float"
    },
    "soundlevel": {
        "value": 0,
        "type": "Float"
    },
    "temperature_f": {
        "value": 0,
        "type": "Float"
    },
    "street": {
        "value": "Heinrich-Büssing-Ring",
        "type": "String"
    },
    "number": {
        "value": "42",
        "type": "String"
    },
    "zip": {
        "value": "38102",
        "type": "String"
    },
    "city": {
        "value": "Braunschweig",
        "type": "String"
    },
    "region": {
        "value": "NS",
        "type": "String"
    },
    "country": {
        "value": "DE",
        "type": "String"
    },
    "continent": {
        "value": "EU",
        "type": "String"
    },
    "location": {
        "value": "52.250270, 10.531070",
        "type": "geo:point"
    },
    "thunderstorm_warning": {
        "value": "false",
        "type": "Boolean"
    },
    "thunderstorm_color": {
        "value": "green",
        "type": "String"
    },
    "timestamp_rcvd": {
        "value": "2016-01-01T00:00:01.000Z",
        "type": "DateTime"
    },
    "Certainty": {
        "value": "",
        "type": "Float"
    },
    "Cost": {
        "value": "",
        "type": "Float"
    },
    "Name": {
        "value": "",
        "type": "String"
    },
    "EventSource": {
        "value": "",
        "type": "String"
    },
    "Duration": {
        "value": "",
        "type": "Float"
    },
    "Annotation": {
        "value": "",
        "type": "String"
    },
    "EventId": {
        "value": "",
        "type": "String"
    },
    "DetectionTime": {
        "value": "",
        "type": "String"
    }
});

var options = {
    hostname: '81.14.183.156',
    port: 1026,
    path: '/v2/entities',
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  }
};

var req = http.request(options, function(res) {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', function(body) {
        console.log(`BODY: ${body}`);
    });
    res.on('end', function() {
        console.log('No more data in response.');
    });
});

req.on('error', function(e) {
    console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();