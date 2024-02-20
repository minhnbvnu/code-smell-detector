function createParserContext(content, rawOptions) {
    const options = extend({}, defaultParserOptions);
    let key;
    for (key in rawOptions) {
      options[key] = rawOptions[key] === void 0 ? defaultParserOptions[key] : rawOptions[key];
    }
    return {
      options,
      column: 1,
      line: 1,
      offset: 0,
      originalSource: content,
      source: content,
      inPre: false,
      inVPre: false,
      onWarn: options.onWarn
    };
  }