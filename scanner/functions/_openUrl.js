function _openUrl(url) {
  const formatUrl = /https:\/\/|http:\/\//.test(url) ? url : `https://${url}`;
  window.open(formatUrl);
}