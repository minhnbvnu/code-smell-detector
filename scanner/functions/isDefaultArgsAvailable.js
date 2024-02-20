function isDefaultArgsAvailable() {
    return tryThis('function foo(a=1) { return a + 1; }', 'default args');
}