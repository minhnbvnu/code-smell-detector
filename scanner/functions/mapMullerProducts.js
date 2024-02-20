function mapMullerProducts(product) {
    return {
        id: product.productId,
        name: product.name,
        price: parseFloat(product.impressionDataLayer.ecommerce.impressions[0].price),
        unit: product.quantityOfContent,
        canonicalUrl: product.productUrl.replace(exports.urlBase, ""),
        category: product.impressionDataLayer.ecommerce.impressions[0].category,
    };
}