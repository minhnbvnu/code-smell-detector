function iterateResources(resources, resType, callback) {
  if (!resources) {
    return;
  }
  for (const [name, res] of Object.entries(resources)) {
    if (res.Type === resType) {
      callback(name, res);
    }
  }
}