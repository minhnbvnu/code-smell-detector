function getModelId (modelName) {
    return getDataPromise('/search?name=' + modelName);
}