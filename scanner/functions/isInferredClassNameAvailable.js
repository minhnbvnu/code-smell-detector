function isInferredClassNameAvailable() {
    return tryThis(
        'const foo = class {}; require("assert").equal(foo.name, "foo")'
    );
}