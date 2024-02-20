function auditTime(duration, scheduler) {
    if (scheduler === void 0) {
        scheduler = __WEBPACK_IMPORTED_MODULE_0__scheduler_async__["a" /* async */];
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__audit__["a" /* audit */])(function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__observable_timer__["a" /* timer */])(duration, scheduler); });
}