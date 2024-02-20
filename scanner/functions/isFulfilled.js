function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}