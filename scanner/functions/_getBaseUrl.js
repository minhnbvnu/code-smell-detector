function _getBaseUrl(u, currentBaseUrl = '') {
  let result;
  if (/^file:\/\//.test(u)) {
    result = u;
  } else if (/^(?:data|blob):/.test(u)) {
    result = currentBaseUrl;
  } else {
    const parsedUrl = url.parse(u);
    result = url.format({
      protocol: parsedUrl.protocol || 'http:',
      host: parsedUrl.host || '127.0.0.1',
      pathname: parsedUrl.pathname.replace(/\/[^\/]*\.[^\/]*$/, '') || '/',
    });
  }
  if (!/\/$/.test(result) && !/\/[^\/]*?\.[^\/]*?$/.test(result)) {
    result += '/';
  }
  return result;
}