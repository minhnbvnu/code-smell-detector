function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}