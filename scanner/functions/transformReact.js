function transformReact(source, options) {
  options = options || {};

  // Force the sourcemaps option manually. We don't want to use it if it will
  // break (see above note about supportsAccessors). We'll only override the
  // value here if sourceMap was specified and is truthy. This guarantees that
  // we won't override any user intent (since this method is exposed publicly).
  if (options.sourceMap) {
    options.sourceMap = supportsAccessors;
  }

  // Otherwise just pass all options straight through to react-tools.
  return ReactTools.transformWithDetails(source, options);
}