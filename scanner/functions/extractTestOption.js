function extractTestOption(opts, name, defaultValue) {
    let v = defaultValue;
    if (Object.prototype.hasOwnProperty.call(opts, name)) {
        v = opts[name];
    }
    return v;
}