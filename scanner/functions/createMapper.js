function createMapper (
  clientManifest
) {
  var map = createMap(clientManifest);
  // map server-side moduleIds to client-side files
  return function mapper (moduleIds) {
    var res = new Set();
    for (var i = 0; i < moduleIds.length; i++) {
      var mapped = map.get(moduleIds[i]);
      if (mapped) {
        for (var j = 0; j < mapped.length; j++) {
          res.add(mapped[j]);
        }
      }
    }
    return Array.from(res)
  }
}