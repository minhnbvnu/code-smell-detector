function testCallingResolvePromiseRejectsWith(yFactory, stringRepresentation, rejectionReason) {
    testCallingResolvePromise(yFactory, stringRepresentation, function (promise, done) {
        promise.then(null, function onPromiseRejected(reason) {
            assert.strictEqual(reason, rejectionReason);
            done();
        });
    });
}