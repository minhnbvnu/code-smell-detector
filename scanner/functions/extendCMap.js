async function extendCMap(cMap, fetchBuiltInCMap, useCMap) {
    cMap.useCMap = await createBuiltInCMap(useCMap, fetchBuiltInCMap);

    if (cMap.numCodespaceRanges === 0) {
      var useCodespaceRanges = cMap.useCMap.codespaceRanges;

      for (var i = 0; i < useCodespaceRanges.length; i++) {
        cMap.codespaceRanges[i] = useCodespaceRanges[i].slice();
      }

      cMap.numCodespaceRanges = cMap.useCMap.numCodespaceRanges;
    }

    cMap.useCMap.forEach(function (key, value) {
      if (!cMap.contains(key)) {
        cMap.mapOne(key, cMap.useCMap.lookup(key));
      }
    });
    return cMap;
  }