function timeInterval(scheduler) {
    if (scheduler === void 0) {
        scheduler = __WEBPACK_IMPORTED_MODULE_0__scheduler_async__["a" /* async */];
    }
    return function (source) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__observable_defer__["a" /* defer */])(function () {
            return source.pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scan__["a" /* scan */])(function (_a, value) {
                var current = _a.current;
                return ({ value: value, current: scheduler.now(), last: current });
            }, { current: scheduler.now(), value: undefined, last: undefined }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__map__["a" /* map */])(function (_a) {
                var current = _a.current, last = _a.last, value = _a.value;
                return new TimeInterval(value, current - last);
            }));
        });
    };
}