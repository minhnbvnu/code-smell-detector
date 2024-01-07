function promisify(callback, receiver) {
    return makeNodePromisified(callback, receiver, undefined, callback);
}