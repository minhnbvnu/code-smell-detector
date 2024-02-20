function projectOne_(name, item, bag) {
    var obj = jsonPath.eval(item, name.trim(), {flatten: true, wrap: false, sandbox: bag});
    // JSONPath returns false when there is no match. This leads to 'false' values. Switch to undefined.
    return obj ? obj : undefined;
}