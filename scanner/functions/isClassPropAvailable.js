function isClassPropAvailable() {
    return tryThis('class Foo { a = 1; }', 'class property');
}