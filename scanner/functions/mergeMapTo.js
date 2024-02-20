function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'function') {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mergeMap__["a" /* mergeMap */])(function () { return innerObservable; }, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mergeMap__["a" /* mergeMap */])(function () { return innerObservable; }, concurrent);
}