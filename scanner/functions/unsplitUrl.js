function unsplitUrl(url) {
  var result = url.path;
  if (result === undefined) {
    result = '';
  }
  if (url.fragment !== undefined) {
    result += '#' + url.fragment;
  }
  if (url.domain !== undefined) {
    if (result.slice(0, 1) === '/') {
      result = result.slice(1);
    }
    result = '//' + url.domain + '/' + result;
    if (url.proto !== undefined) {
      result = url.proto + ':' + result;
    }
  }
  return result;
}