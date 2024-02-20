function isClassPrivatePropAvailable() {
    return tryThis('class Foo { #a = 1; }', 'class private property');
}