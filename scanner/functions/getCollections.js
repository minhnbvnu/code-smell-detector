function getCollections (collection_folder) {
  return fs.readdirSync(collection_folder)
    .map((collection) => {
      return {
        path: path.join(collection_folder, collection),
        name: collection.includes('.') ? collection.split('.')[0] : collection
      };
    });
}