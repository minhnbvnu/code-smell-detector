function searchModelWithObservables(modelName) {
    getModelId(modelName)
        .flatMap(getShops)
        .subscribe(printShops);
}