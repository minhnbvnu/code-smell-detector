function parse_url(url) {
  var auth_str = request_auth(url);
  var auth = null;
  if (auth_str) {
    if (auth_str.indexOf('token:') == 0) {
      auth = auth_str;
    } else {
      auth = 'Basic ' + btoa(auth_str);
    }
  }
  var url_path = remove_auth(url);
  function request_auth(url) {
    return url.match(/^(?:(?![^:@]+:[^:@\/]*@)[^:\/?#.]+:)?(?:\/\/)?(?:([^:@]*(?::[^:@]*)?)?@)?/)[1];
  }
  function remove_auth(url) {
    return url.replace(/^((?![^:@]+:[^:@\/]*@)[^:\/?#.]+:)?(\/\/)?(?:(?:[^:@]*(?::[^:@]*)?)?@)?(.*)/, '$1$2$3');
  }
  return [url_path, auth];
}