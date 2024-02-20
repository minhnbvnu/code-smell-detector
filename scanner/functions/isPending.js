function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}