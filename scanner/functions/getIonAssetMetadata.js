async function getIonAssetMetadata(accessToken, assetId) {
    assert2(accessToken, assetId);
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `${CESIUM_ION_URL}/${assetId}`;
    let response = await fetchFile(`${url}`, { fetch: { headers } });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let metadata = await response.json();
    response = await fetchFile(`${url}/endpoint`, { fetch: { headers } });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const tilesetInfo = await response.json();
    metadata = {
      ...metadata,
      ...tilesetInfo
    };
    return metadata;
  }