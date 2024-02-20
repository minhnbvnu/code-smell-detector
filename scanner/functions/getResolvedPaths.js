function getResolvedPaths(options) {

    var types = options.options.types,
        data = options.options.data;

    return resolvePaths(options.context, options.params, { types: types, data: data });
  }