function isExportStory(key, _ref) {
  var includeStories = _ref.includeStories,
      excludeStories = _ref.excludeStories;
  return (// https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    key !== '__esModule' && (!includeStories || matches(key, includeStories)) && (!excludeStories || !matches(key, excludeStories))
  );
}