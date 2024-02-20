function processHtml (filename, contents, resourcePrefix, config, includeJson) {
  contents = Util.processHtml(contents, function (value, type) {
    if (!type || type === 'url') {
      value = splitValue(filename, value, resourcePrefix, config, includeJson, true);
    } else if (type === 'content') {
      value = printResource(filename, value, resourcePrefix, config, includeJson);
    }
    return value;
  });
  return contents;
}