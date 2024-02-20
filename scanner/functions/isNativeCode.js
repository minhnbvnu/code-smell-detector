function isNativeCode(fn) {
    // Relies on the toString method to identify native code.
    return ((typeof fn) === "function") && fn.toString().match(/\[native code\]/);
}