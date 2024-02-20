function combineAll(project) {
    return function (source) { return source.lift(new __WEBPACK_IMPORTED_MODULE_0__observable_combineLatest__["b" /* CombineLatestOperator */](project)); };
}