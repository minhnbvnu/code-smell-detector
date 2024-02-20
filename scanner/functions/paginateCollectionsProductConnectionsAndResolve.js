function paginateCollectionsProductConnectionsAndResolve(client) {
  return function(collectionOrCollections) {
    const collections = [].concat(collectionOrCollections);

    return Promise.all(collections.reduce((promiseAcc, collection) => {
      return promiseAcc.concat(fetchResourcesForProducts(collection.products, client));
    }, [])).then(() => {
      return collectionOrCollections;
    });
  };
}