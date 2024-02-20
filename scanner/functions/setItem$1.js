function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}