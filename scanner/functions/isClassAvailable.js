function isClassAvailable() {
    return tryThis("new Function('args', '{class Foo extends (Bar) {}}')");
}