function joinUrl(base, rel) {
  var relsp = splitUrl(rel);
  if (relsp.domain !== undefined) {
    return rel;
  }
  var result = splitUrl(base);
  if (relsp.path === undefined) {
    // change only fragment part
    result.fragment = relsp.fragment;
  } else if (relsp.path.slice(0, 1) === '/') {
    // relative to domain
    result.path = relsp.path;
    result.fragment = relsp.fragment;
  } else {
    // relative to path
    var path = result.path === undefined ? [] : result.path.split('/');
    var relpath = relsp.path.split('/');
    if (path.length) {
      path.pop();
    }
    while (relpath[0] === '..' || relpath[0] === '.') {
      if (relpath[0] === '..') {
        path.pop();
      }
      relpath.shift();
    }
    result.path = path.concat(relpath).join('/');
    result.fragment = relsp.fragment;
  }
  return unsplitUrl(result);
}