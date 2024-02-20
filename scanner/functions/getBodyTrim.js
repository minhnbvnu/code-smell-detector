function getBodyTrim (options) {
  if (options && options.trimRequestBody) {
    return options.trimRequestBody;
  }
  return false;
}