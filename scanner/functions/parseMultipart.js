function parseMultipart (bodyArray, indentString, trimBody) {
  return _.reduce(bodyArray, function (bodyString, item) {
    if (item.disabled) {
      return bodyString;
    }
    /* istanbul ignore next */
    if (item.type === 'file') {
      bodyString += indentString + `.attach('file', '${sanitize(item.src, trimBody)}')\n`;
    }
    else {
      bodyString += indentString +
                          `.field('${sanitize(item.key, trimBody)}', '${sanitize(item.value, trimBody)}')\n`;
    }
    return bodyString;
  }, '');
}