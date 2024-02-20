function headersGetter(headers) {
  var headersObj;

  return function(name) {
    if (!headersObj) headersObj =  parseHeaders(headers);

    if (name) {
      var value = headersObj[lowercase(name)];
      if (value === void 0) {
        value = null;
      }
      return value;
    }

    return headersObj;
  };
}