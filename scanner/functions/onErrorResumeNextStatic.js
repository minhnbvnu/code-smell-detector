function onErrorResumeNextStatic() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i] = arguments[_i];
    }
    var source = null;
    if (nextSources.length === 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isArray__["a" /* isArray */])(nextSources[0])) {
        nextSources = nextSources[0];
    }
    source = nextSources.shift();
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__observable_from__["a" /* from */])(source, null).lift(new OnErrorResumeNextOperator(nextSources));
}