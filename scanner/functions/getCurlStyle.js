function getCurlStyle (method, contentType) {
  if (method.toUpperCase() === 'POST') {
    if (contentType === 'application/x-www-form-urlencoded') {
      return 'post';
    }
    return 'httppost';
  }
  return '';
}