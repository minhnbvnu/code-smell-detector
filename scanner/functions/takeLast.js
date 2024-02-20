function takeLast(count) {
    return function takeLastOperatorFunction(source) {
        if (count === 0) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__observable_empty__["a" /* empty */])();
        }
        else {
            return source.lift(new TakeLastOperator(count));
        }
    };
}