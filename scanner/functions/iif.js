function iif(condition, trueResult, falseResult) {
    if (trueResult === void 0) {
        trueResult = __WEBPACK_IMPORTED_MODULE_1__empty__["b" /* EMPTY */];
    }
    if (falseResult === void 0) {
        falseResult = __WEBPACK_IMPORTED_MODULE_1__empty__["b" /* EMPTY */];
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__defer__["a" /* defer */])(function () { return condition() ? trueResult : falseResult; });
}