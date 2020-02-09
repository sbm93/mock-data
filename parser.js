const uuidv1 = require('uuid/v1');
var fs = require('fs');

var SCHEMA = {
    "temperature": "double",
    "latitude": "double",
    "longitude": "double",
    "humidity": "double",
    "cri_status": "int",
    "temp_threshold": "int",
    "sensor_life_crit": "int",
    "EventProcessedUtcTime": "date",
    "PartitionId": "int",
    "EventEnqueuedUtcTime": "date",
    "IoTHub": {
      "MessageId": "int",
      "CorrelationId": "int",
      "ConnectionDeviceId": "string",
      "ConnectionDeviceGenerationId": "double",
      "EnqueuedTime": "date",
      "StreamId": "int"
    }
}

var result = []
for(let i = 0; i<10000; i++) {
    result.push(parser(SCHEMA, {}));
}

fs.writeFile('myjsonfile.json', JSON.stringify(result, null, 4), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);

function parser(SCHEMA, object) {
    for(var key in SCHEMA) {
        if(typeof SCHEMA[key] == "object") {
            object[key] = parser(SCHEMA[key], {});
        }
        if(SCHEMA[key] == "double") {
            object[key] = randomNumber();
        }
        if(SCHEMA[key] == "int") {
            object[key] = Math.floor(randomNumber());
        }

        if(SCHEMA[key] == "string") {
            object[key] = uuidv1();
        }

        if(SCHEMA[key] == "date") {
            object[key] = randomDate(new Date(2012, 0, 1), new Date())
        }
    }

    return object
}


function randomNumber() {
    return Math.random() * Math.random() * 100;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

