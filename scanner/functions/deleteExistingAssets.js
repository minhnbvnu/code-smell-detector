async function deleteExistingAssets(existingAssets = []) {
    try {
      for await (const asset of existingAssets) {
        console.log(`Deleting blob ${asset.name}`);
        containerClient.deleteBlob(asset.name);
      }
      return Promise.resolve(true);
    } catch (ex) {
      return Promise.reject(ex.message);
    }
  }