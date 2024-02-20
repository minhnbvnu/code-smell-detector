function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_isScheduler__["a" /* isScheduler */])(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__operators_map__["a" /* map */])(function (args) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_isArray__["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
            };
        }
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = {
            subject: undefined,
            args: args,
            callbackFunc: callbackFunc,
            scheduler: scheduler,
            context: this,
        };
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            var context = params.context;
            var subject = params.subject;
            if (!scheduler) {
                if (!subject) {
                    subject = params.subject = new __WEBPACK_IMPORTED_MODULE_1__AsyncSubject__["a" /* AsyncSubject */]();
                    var handler = function () {
                        var innerArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            innerArgs[_i] = arguments[_i];
                        }
                        var err = innerArgs.shift();
                        if (err) {
                            subject.error(err);
                            return;
                        }
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    };
                    try {
                        callbackFunc.apply(context, args.concat([handler]));
                    }
                    catch (err) {
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_canReportError__["a" /* canReportError */])(subject)) {
                            subject.error(err);
                        }
                        else {
                            console.warn(err);
                        }
                    }
                }
                return subject.subscribe(subscriber);
            }
            else {
                return scheduler.schedule(dispatch, 0, { params: params, subscriber: subscriber, context: context });
            }
        });
    };
}