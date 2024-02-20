function normalizeHeaderValue(value) {
    // Ref: https://fetch.spec.whatwg.org/#http-whitespace-bytes
    /*eslint no-control-regex: "off"*/
    return value.replace(/^[\x09\x0A\x0D\x20]+|[\x09\x0A\x0D\x20]+$/g, "");
}