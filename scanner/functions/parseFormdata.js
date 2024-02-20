function parseFormdata (bodyArray, indentString, trimBody) {
  return _.reduce(bodyArray, function (bodyString, item) {
    if (item.disabled) {
      return bodyString;
    }
    bodyString += indentString +
      '.send(' + `'${sanitize(item.key, trimBody)}=${sanitize(item.value, trimBody)}'`.replace(/&/g, '%26') + ')\n';
    return bodyString;
  }, '');
}