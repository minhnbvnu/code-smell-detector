function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = __WEBPACK_IMPORTED_MODULE_4__config__["a" /* config */].Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}