function detectWebGlNotSupported() {
    return webglContextCreatedForTesting === null || webglContextCreatedForTesting === undefined;
}