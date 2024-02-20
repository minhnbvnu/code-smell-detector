function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) {
        scheduler = __WEBPACK_IMPORTED_MODULE_2__scheduler_async__["a" /* async */];
    }
    if (config === void 0) {
        config = __WEBPACK_IMPORTED_MODULE_3__throttle__["b" /* defaultThrottleConfig */];
    }
    return function (source) { return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing)); };
}