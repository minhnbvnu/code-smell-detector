function DistinctSubscriber(destination, keySelector, flushes) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.values = new Set();
        if (flushes) {
            _this.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_subscribeToResult__["a" /* subscribeToResult */])(_this, flushes));
        }
        return _this;
    }