async function getIonTilesetMetadata(accessToken, assetId) {
    if (!assetId) {
      const assets = await getIonAssets(accessToken);
      for (const item of assets.items) {
        if (item.type === "3DTILES") {
          assetId = item.id;
        }
      }
    }
    const ionAssetMetadata = await getIonAssetMetadata(accessToken, assetId);
    const { type, url } = ionAssetMetadata;
    assert2(type === "3DTILES" && url);
    ionAssetMetadata.headers = {
      Authorization: `Bearer ${ionAssetMetadata.accessToken}`
    };
    return ionAssetMetadata;
  }