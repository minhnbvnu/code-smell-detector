function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}