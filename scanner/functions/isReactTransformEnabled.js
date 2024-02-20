function isReactTransformEnabled(mappings) {
    return any(vals(mappings), function (mapping) {
      var source = mapping[2].source;
      return source && source.indexOf("__$$LiveReactLoadable") !== -1;
    });
  }