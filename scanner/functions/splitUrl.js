function splitUrl(url) {
  var result = {};
  var proto = /[a-z]+:\/\//i.exec(url);
  if (proto) {
    result.proto = proto[0].slice(0, -3);
    url = url.slice(result.proto.length + 1);
  }
  if (url.slice(0, 2) === '//') {
    result.domain = url.slice(2).split('/')[0];
    url = url.slice(2 + result.domain.length);
  }
  var p = url.split('#');
  if (p[0].length) {
    result.path = p[0];
  }
  if (p.length > 1) {
    result.fragment = p.slice(1).join('#');
  }
  return result;
}