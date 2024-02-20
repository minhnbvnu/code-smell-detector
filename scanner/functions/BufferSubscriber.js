function BufferSubscriber(destination, closingNotifier) {
        var _this = _super.call(this, destination) || this;
        _this.buffer = [];
        _this.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_subscribeToResult__["a" /* subscribeToResult */])(_this, closingNotifier));
        return _this;
    }