function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new __WEBPACK_IMPORTED_MODULE_0__util_ArgumentOutOfRangeError__["a" /* ArgumentOutOfRangeError */]();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__filter__["a" /* filter */])(function (v, i) { return i === index; }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__take__["a" /* take */])(1), hasDefaultValue
            ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__defaultIfEmpty__["a" /* defaultIfEmpty */])(defaultValue)
            : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__throwIfEmpty__["a" /* throwIfEmpty */])(function () { return new __WEBPACK_IMPORTED_MODULE_0__util_ArgumentOutOfRangeError__["a" /* ArgumentOutOfRangeError */](); }));
    };
}