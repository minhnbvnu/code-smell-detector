function emptyScheduled(scheduler) {
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}