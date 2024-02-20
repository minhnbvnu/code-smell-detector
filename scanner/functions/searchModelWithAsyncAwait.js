async function searchModelWithAsyncAwait(modelName) {
    var modelId = await getModelId(modelName);
    var shops = await getShops(modelId);
    return shops;
}