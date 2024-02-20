function _normalizeUrl(src, baseUrl) {
  if (/^\/\//.test(src)) {
    src = new URL(baseUrl).protocol + src;
  }
  /* if (!/^(?:\/|[a-z]+:)/.test(src)) {
    src = baseUrl + (!/\/$/.test(baseUrl) ? '/' : '') + src;
  } */
  if (!/^(?:https?|data|blob):/.test(src)) {
    return new URL(src, baseUrl).href
      .replace(/^(file:\/\/)\/([a-z]:.*)$/i, '$1$2');
  } else {
    return src;
  }
}