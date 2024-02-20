function isValidRequest(obj, payload) {
    return _.has(obj, 'products') && _.has(obj.products, payload.sku)
}