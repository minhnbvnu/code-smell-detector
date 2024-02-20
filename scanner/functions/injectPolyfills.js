function injectPolyfills(dataModel) {
    Object.keys(polyfills).forEach(function(key) {
        if (!dataModel[key]) {
            dataModel[key] = polyfills[key];
        }
    });
}