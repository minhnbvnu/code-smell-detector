function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments.length > 2 ? arguments[2] : undefined;

  if (typeof options === "string") {
    options = {
      path: options
    };
  }

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === void 0 ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === void 0 ? false : _options$sensitive;

  if (path == null) {
    return parent;
  }

  if (path.slice(-3) === '/**' || path === '**') {
    path = path === '**' ? '' : path.slice(0, -3) || '/';
    exact = false;
  }

  path = resolve(path, parent ? parent.url : '/');

  var _compilePath = compilePath(path, {
    end: exact,
    strict: strict,
    sensitive: sensitive
  }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) {
    return null;
  }

  var _match = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_toArray___default()(match),
      url = _match[0],
      values = _match.slice(1);

  var isExact = pathname === url;
  if (exact && !isExact) return null;
  return new MatchResult(path, path === '/' && url === '' ? '/' : url, isExact, keys.reduce(function (memo, key, index) {
    memo[key.name] = values[index];
    return memo;
  }, {}));
}