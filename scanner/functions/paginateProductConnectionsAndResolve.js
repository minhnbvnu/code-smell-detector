function paginateProductConnectionsAndResolve(client) {
  return function(products) {
    return fetchResourcesForProducts(products, client).then(() => {
      return products;
    });
  };
}