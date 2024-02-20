function isInferredFunctionNameAvailable() {
    return tryThis(
        'const foo = function () {}; require("assert").equal(foo.name, "foo")'
    );
}