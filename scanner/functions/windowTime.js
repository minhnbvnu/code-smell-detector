function windowTime(windowTimeSpan) {
    var scheduler = __WEBPACK_IMPORTED_MODULE_2__scheduler_async__["a" /* async */];
    var windowCreationInterval = null;
    var maxWindowSize = Number.POSITIVE_INFINITY;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_isScheduler__["a" /* isScheduler */])(arguments[3])) {
        scheduler = arguments[3];
    }
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_isScheduler__["a" /* isScheduler */])(arguments[2])) {
        scheduler = arguments[2];
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_isNumeric__["a" /* isNumeric */])(arguments[2])) {
        maxWindowSize = arguments[2];
    }
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_isScheduler__["a" /* isScheduler */])(arguments[1])) {
        scheduler = arguments[1];
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_isNumeric__["a" /* isNumeric */])(arguments[1])) {
        windowCreationInterval = arguments[1];
    }
    return function windowTimeOperatorFunction(source) {
        return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
    };
}