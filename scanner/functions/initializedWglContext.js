function initializedWglContext() {
    if (__sharedInstance === undefined) {
        __sharedInstance = new WglContext(canvasCreatedForTesting, webglContextCreatedForTesting);
    }
    return __sharedInstance;
}