function getShops(modelId) {
    return getDataPromise('/shopOffers?id=' + modelId)
}