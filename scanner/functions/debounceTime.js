function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) {
        scheduler = __WEBPACK_IMPORTED_MODULE_2__scheduler_async__["a" /* async */];
    }
    return function (source) { return source.lift(new DebounceTimeOperator(dueTime, scheduler)); };
}