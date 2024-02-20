function isForOfAvailable() {
    return tryThis(
        'function *foo() { yield 1; }\n' + 'for (var k of foo()) {}',
        'for-of'
    );
}