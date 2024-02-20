function switchMap(project, resultSelector) {
    if (typeof resultSelector === 'function') {
        return function (source) { return source.pipe(switchMap(function (a, i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__observable_from__["a" /* from */])(project(a, i)).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__map__["a" /* map */])(function (b, ii) { return resultSelector(a, b, i, ii); })); })); };
    }
    return function (source) { return source.lift(new SwitchMapOperator(project)); };
}