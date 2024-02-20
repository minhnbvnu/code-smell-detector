function $makeCoroutine(code) {
    return new $Function(code)();
}