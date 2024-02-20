function hasCallsLeft(callMap, spy) {
    if (callMap[spy.id] === undefined) {
        callMap[spy.id] = 0;
    }

    return callMap[spy.id] < spy.callCount;
}