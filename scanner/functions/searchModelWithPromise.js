function searchModelWithPromise(modelName) {
    getModelId(modelName)
        .then(getShops)
        .then(printShops);
}