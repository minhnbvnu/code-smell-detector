function shareReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
        bufferSize = Number.POSITIVE_INFINITY;
    }
    if (windowTime === void 0) {
        windowTime = Number.POSITIVE_INFINITY;
    }
    return function (source) { return source.lift(shareReplayOperator(bufferSize, windowTime, scheduler)); };
}