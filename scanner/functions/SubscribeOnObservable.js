function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) {
            delayTime = 0;
        }
        if (scheduler === void 0) {
            scheduler = __WEBPACK_IMPORTED_MODULE_2__scheduler_asap__["a" /* asap */];
        }
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_isNumeric__["a" /* isNumeric */])(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = __WEBPACK_IMPORTED_MODULE_2__scheduler_asap__["a" /* asap */];
        }
        return _this;
    }