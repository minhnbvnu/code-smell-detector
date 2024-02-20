function verifyGoodStats(test, event, statsFields) {
    test.ok(event.heartbeat);
    test.ok(event.heartbeat.data);
    test.ok(event.heartbeat.data[0]);
    test.ok(event.heartbeat.data[0].server && event.heartbeat.data[0].server == '127.0.0.1:8026');
    _.each(statsFields, function (field) {
        test.ok(event.heartbeat.data[0][field] != undefined);
    })
}