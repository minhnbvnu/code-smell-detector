function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]) {
            return nextOrObserver;
        }
        if (nextOrObserver[__WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__["a" /* rxSubscriber */]]) {
            return nextOrObserver[__WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__["a" /* rxSubscriber */]]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */](__WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */]);
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */](nextOrObserver, error, complete);
}