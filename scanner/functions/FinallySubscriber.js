function FinallySubscriber(destination, callback) {
        var _this = _super.call(this, destination) || this;
        _this.add(new __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */](callback));
        return _this;
    }