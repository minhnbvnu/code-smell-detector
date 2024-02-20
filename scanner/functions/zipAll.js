function zipAll(project) {
    return function (source) { return source.lift(new __WEBPACK_IMPORTED_MODULE_0__observable_zip__["b" /* ZipOperator */](project)); };
}