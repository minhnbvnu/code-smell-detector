function _prepareApiPrefix(apiPrefix) {
  if (typeof apiPrefix === 'string') return apiPrefix;
  return apiPrefix ? '/api' : '';
}