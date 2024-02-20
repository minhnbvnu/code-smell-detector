function WindowToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(_this.openSubscription = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_subscribeToResult__["a" /* subscribeToResult */])(_this, openings, openings));
        return _this;
    }