function makeArray(arr) {
    Debug.deprecated('pc.makeArray is not public API and should not be used. Use Array.prototype.slice.call instead.');
    return Array.prototype.slice.call(arr);
}