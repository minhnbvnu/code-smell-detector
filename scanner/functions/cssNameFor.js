function cssNameFor(key) {
    if (key.include('border')) key = key + '-width';
    return key.camelize();
  }