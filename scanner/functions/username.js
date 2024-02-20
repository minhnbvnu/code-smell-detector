function username(repo) {
  if (!repo) {
    return null;
  }

  var o = url.parse(repo);
  var path = o.path;

  if (path.length && path.charAt(0) === '/') {
    path = path.slice(1);
  }

  path = path.split('/')[0];
  return path;
}