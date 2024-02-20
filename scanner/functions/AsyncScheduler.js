function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = __WEBPACK_IMPORTED_MODULE_1__Scheduler__["a" /* Scheduler */].now;
        }
        var _this = _super.call(this, SchedulerAction, function () {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                return AsyncScheduler.delegate.now();
            }
            else {
                return now();
            }
        }) || this;
        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
    }