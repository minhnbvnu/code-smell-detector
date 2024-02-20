function parseTextSync(text, options) {
    const jsonOptions = { ...options, json: { ...DEFAULT_JSON_LOADER_OPTIONS.json, ...options?.json } };
    return parseJSONSync(text, jsonOptions);
  }