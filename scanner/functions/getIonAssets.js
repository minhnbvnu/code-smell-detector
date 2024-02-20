async function getIonAssets(accessToken) {
    assert2(accessToken);
    const url = CESIUM_ION_URL;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetchFile(url, { fetch: { headers } });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }