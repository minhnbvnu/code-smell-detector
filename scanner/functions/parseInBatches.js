function parseInBatches(asyncIterator, options) {
    const jsonOptions = { ...options, json: { ...DEFAULT_JSON_LOADER_OPTIONS.json, ...options?.json } };
    return parseJSONInBatches(asyncIterator, jsonOptions);
  }