function processJs (filename, contents, resourcePrefix, config, includeJson) {
  contents = Util.processJs(contents, function (value, type) {
    if (!type || type === 'url') {
      value = splitValue(filename, value, resourcePrefix, config, includeJson, true);
    } else if (type === 'content') {
      value = printResource(filename, value, resourcePrefix, config, includeJson);
    } else if (type === 'hash') {
      value = getHashName(filename, value, config);
    } else if (type === 'tplSourceMap') {
      value = getTplSourceMap(config);
    }
    return value;
  });
  return contents;
}