function decodeSourceMap(map) {
    if (typeof map === "string") {
      map = JSON.parse(map);
    }
    let { mappings } = map;
    if (typeof mappings === "string") {
      mappings = decode$1(mappings);
    } else {
      mappings = mappings.map(cloneSegmentLine);
    }
    mappings.forEach(sortSegments);
    return defaults({ mappings }, map);
  }