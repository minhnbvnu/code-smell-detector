function TapSubscriber(destination, observerOrNext, error, complete) {
        var _this = _super.call(this, destination) || this;
        _this._tapNext = __WEBPACK_IMPORTED_MODULE_2__util_noop__["a" /* noop */];
        _this._tapError = __WEBPACK_IMPORTED_MODULE_2__util_noop__["a" /* noop */];
        _this._tapComplete = __WEBPACK_IMPORTED_MODULE_2__util_noop__["a" /* noop */];
        _this._tapError = error || __WEBPACK_IMPORTED_MODULE_2__util_noop__["a" /* noop */];
        _this._tapComplete = complete || __WEBPACK_IMPORTED_MODULE_2__util_noop__["a" /* noop */];
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_isFunction__["a" /* isFunction */])(observerOrNext)) {
            _this._context = _this;
            _this._tapNext = observerOrNext;
        }
        else if (observerOrNext) {
            _this._context = observerOrNext;
            _this._tapNext = observerOrNext.next || __WEBPACK_IMPORTED_MODULE_2__util_noop__["a" /* noop */];
            _this._tapError = observerOrNext.error || __WEBPACK_IMPORTED_MODULE_2__util_noop__["a" /* noop */];
            _this._tapComplete = observerOrNext.complete || __WEBPACK_IMPORTED_MODULE_2__util_noop__["a" /* noop */];
        }
        return _this;
    }