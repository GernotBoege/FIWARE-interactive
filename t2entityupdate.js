// Import the interface to Tessel hardware
var tessel = require('tessel');

var climatelib = require('climate-si7020');
var ambientlib = require('ambient-attx4');

var http = require('http');

var climate = climatelib.use(tessel.port['A']);
var ambient = ambientlib.use(tessel.port['B']);

climate.on('ready', function () {
    console.log('Connected to climate module');

    ambient.on('ready', function () {
        console.log('Connected to ambient module');

        setInterval( function () {
            ambient.getLightLevel( function(err, lightdata) {
                if (err) throw err;

                ambient.getSoundLevel( function(err, sounddata) {
                    if (err) throw err;

                    climate.readTemperature('f', function (err, tempf) {
                        if (err) throw err;

                        var tempc = (tempf - 32) * 5 / 9;

                        climate.readHumidity(function (err, humid) {
                            if (err) throw err;

                            var unix = new Date();
                            var isotimestamp = unix.toISOString();

                            console.log(isotimestamp);

                            var postData = JSON.stringify({
                                "brightness": {
                                  "value": lightdata.toFixed(4),
                                  "type": "Float"
                                },
                                "humidity": {
                                    "value": humid.toFixed(4),
                                    "type": "Float"
                                },
                                "soundlevel": {
                                    "value": sounddata.toFixed(4),
                                    "type": "Float"
                                },
                                "temperature_c": {
                                  "value": tempc.toFixed(4),
                                  "type": "Float"
                                },
                                "temperature_f": {
                                  "value": tempf.toFixed(4),
                                  "type": "Float"
                                },
                                "timestamp_rcvd": {
                                  "value": isotimestamp,
                                  "type": "DateTime"
                                }
                            });

                            var options = {
                              hostname: '81.14.183.156',
                              port: 1026,
                              path: '/v2/entities/SCS-001/attrs',
                              method: 'PATCH',
                              headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Content-Length': Buffer.byteLength(postData)
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

                            // write data to request body
                            req.write(postData);
                            req.end();

                            req.on('error', function(e) {
                                console.log(`problem with request: ${e.message}`);
                            });

                            console.log("Light: ", lightdata.toFixed(4), " Sound: ", sounddata.toFixed(4), " TempF: ", tempf.toFixed(4), " Humidity: ", humid.toFixed(4), " TempC: ", tempc.toFixed(4));
                        });
                    });
                });
            });
        }, 60000); // The readings will happen every 60 seconds
    });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});

ambient.on('error', function (err) {
  console.log(err);
});