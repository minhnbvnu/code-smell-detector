function addGlobal() {
  if (!window.__k) {
    window.__k = {
      dm: dataMap,
      u: getUrl,
      d: dataAssets,
      i: imageAssets
    };
  }
}