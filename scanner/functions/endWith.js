function endWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i] = arguments[_i];
    }
    return function (source) {
        var scheduler = array[array.length - 1];
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_isScheduler__["a" /* isScheduler */])(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len === 1 && !scheduler) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__observable_concat__["a" /* concat */])(source, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__observable_scalar__["a" /* scalar */])(array[0]));
        }
        else if (len > 0) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__observable_concat__["a" /* concat */])(source, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observable_fromArray__["a" /* fromArray */])(array, scheduler));
        }
        else {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__observable_concat__["a" /* concat */])(source, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__observable_empty__["a" /* empty */])(scheduler));
        }
    };
}