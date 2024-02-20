function makeMetadata(metadata) {
    const metadataMap = new Map();
    for (const key in metadata) {
      metadataMap.set(`${key}.string`, JSON.stringify(metadata[key]));
    }
    return metadataMap;
  }