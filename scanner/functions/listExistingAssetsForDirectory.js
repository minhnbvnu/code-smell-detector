async function listExistingAssetsForDirectory() {
    return containerClient.listBlobsFlat({ prefix: directory });
  }