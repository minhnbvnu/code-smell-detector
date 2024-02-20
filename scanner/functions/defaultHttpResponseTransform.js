function defaultHttpResponseTransform(data, headers) {
  if (isString(data)) {
    // Strip json vulnerability protection prefix and trim whitespace
    var tempData = data.replace(JSON_PROTECTION_PREFIX, '').trim();

    if (tempData) {
      var contentType = headers('Content-Type');
      if ((contentType && (contentType.indexOf(APPLICATION_JSON) === 0)) || isJsonLike(tempData)) {
        data = fromJson(tempData);
      }
    }
  }

  return data;
}