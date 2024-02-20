function canReportError(observer) {
    while (observer) {
        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
        if (closed_1 || isStopped) {
            return false;
        }
        else if (destination && destination instanceof __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]) {
            observer = destination;
        }
        else {
            observer = null;
        }
    }
    return true;
}