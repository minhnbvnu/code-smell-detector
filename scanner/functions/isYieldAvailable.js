function isYieldAvailable() {
    return tryThis('function *foo() { yield 1; }', 'yield');
}