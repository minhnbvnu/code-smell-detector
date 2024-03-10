function matchRoutes(routes, path, query, routerURLPatternOptions) {
  var match, page, notFound, queryObj = query, urlPatternOptions;

  if (!Array.isArray(routes)) {
    routes = [routes];
  }

  path = path.split('?');
  var pathToMatch = path[0];
  var queryString = path[1];
  if (queryString) {
    queryObj = qs.parse(queryString);
  }

  for (var i = 0, len = routes.length; i < len; i++) {
    var current = routes[i];
    // Simply skip null or undefined to allow ternaries in route definitions
    if (!current) continue;

    invariant(
      current.props.handler !== undefined && current.props.path !== undefined,
      "Router should contain either Route or NotFound components as routes");

    if (current.props.path) {
      // Allow passing compiler options to url-pattern, see
      // https://github.com/snd/url-pattern#customize-the-pattern-syntax
      // Note that this blows up if you provide an empty object on a regex path
      urlPatternOptions = null;
      if (Array.isArray(current.props.urlPatternOptions) || current.props.path instanceof RegExp) {
        // If an array is passed, it takes precedence - assumed these are regexp keys
        urlPatternOptions = current.props.urlPatternOptions;
      } else if (routerURLPatternOptions || current.props.urlPatternOptions) {
        urlPatternOptions = assign({}, routerURLPatternOptions, current.props.urlPatternOptions);
      }

      // matchKeys is deprecated
      // FIXME remove this block in next minor version
      if(current.props.matchKeys) {
        urlPatternOptions = current.props.matchKeys;
        warning(false,
          '`matchKeys` is deprecated; please use the prop `urlPatternOptions` instead. See the CHANGELOG for details.');
      }

      var cacheKey = current.props.path + (urlPatternOptions ? JSON.stringify(urlPatternOptions) : '');

      var pattern = patternCache[cacheKey];
      if (!pattern) {
        pattern = patternCache[cacheKey] = new URLPattern(current.props.path, urlPatternOptions);
      }

      if (!page) {
        match = pattern.match(pathToMatch);
        if (match) {
          page = current;
        }

        // Backcompat fix in 0.27: regexes in url-pattern no longer return {_: matches}
        if (match && current.props.path instanceof RegExp && !match._ && Array.isArray(match)) {
          match = {_: match};
        }

        // Backcompat fix; url-pattern removed the array wrapper on wildcards
        if (match && match._ != null && !Array.isArray(match._)) {
          match._ = [match._];
        }

      }
    }
    if (!notFound && current.props.path === null) {
      notFound = current;
    }
  }

  return new Match(
    pathToMatch,
    page ? page : notFound ? notFound : null,
    match,
    queryObj,
    (urlPatternOptions || {}).namedSegmentValueDecoders
  );
}