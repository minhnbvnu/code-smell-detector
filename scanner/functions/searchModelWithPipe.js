function searchModelWithPipe(modelName) {
    getModelId(modelName)
        .pipe(getShops)
        .done(printShops);
}