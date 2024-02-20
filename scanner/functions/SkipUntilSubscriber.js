function SkipUntilSubscriber(destination, notifier) {
        var _this = _super.call(this, destination) || this;
        _this.hasValue = false;
        var innerSubscriber = new __WEBPACK_IMPORTED_MODULE_2__InnerSubscriber__["a" /* InnerSubscriber */](_this, undefined, undefined);
        _this.add(innerSubscriber);
        _this.innerSubscription = innerSubscriber;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_subscribeToResult__["a" /* subscribeToResult */])(_this, notifier, undefined, undefined, innerSubscriber);
        return _this;
    }