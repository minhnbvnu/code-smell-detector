function parseBinaryCMap(name, builtInCMapParams) {
    var url = builtInCMapParams.url + name + '.bcmap';
    var cMap = new CMap(true);
    new BinaryCMapReader().read(url, cMap, function (useCMap) {
      extendCMap(cMap, builtInCMapParams, useCMap);
    });
    return cMap;
  }