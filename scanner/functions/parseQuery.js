function parseQuery(search) {
  var params = {};

  if (!search) {
    return params;
  }

  if (search.indexOf('?') === 0) {
    search = search.substring(1);
  }

  var ps = search.split(/[&;]/);
  var p;
  var n;
  var k;
  var v;

  for (var i = 0, l = ps.length; i < l; i++) {
    p = ps[i];
    n = p.indexOf('=');

    if (n === 0) {
      continue;
    }

    if (n < 0) {
      k = p;
      v = null;
    } else {
      k = decode(p.substring(0, n));
      v = decode(p.substring(n + 1));
    }

    if (Object(__WEBPACK_IMPORTED_MODULE_10__core_obx_utils__["k" /* hasOwnProperty */])(params, k)) {
      if (!Array.isArray(params[k])) {
        params[k] = [params[k]];
      }

      params[k].push(v);
    } else {
      params[k] = v;
    }
  }

  return params;
}