function BufferToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_subscribeToResult__["a" /* subscribeToResult */])(_this, openings));
        return _this;
    }