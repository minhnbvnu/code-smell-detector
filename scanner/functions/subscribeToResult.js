function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
    if (destination === void 0) {
        destination = new __WEBPACK_IMPORTED_MODULE_0__InnerSubscriber__["a" /* InnerSubscriber */](outerSubscriber, outerValue, outerIndex);
    }
    if (destination.closed) {
        return;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__subscribeTo__["a" /* subscribeTo */])(result)(destination);
}