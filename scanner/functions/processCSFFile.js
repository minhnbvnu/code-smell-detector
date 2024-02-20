function processCSFFile(moduleExports, importPath, title) {
  var defaultExport = moduleExports.default,
      __namedExportsOrder = moduleExports.__namedExportsOrder,
      namedExports = _objectWithoutProperties(moduleExports, _excluded);

  var meta = Object(_normalizeComponentAnnotations__WEBPACK_IMPORTED_MODULE_7__[/* normalizeComponentAnnotations */ "a"])(defaultExport, title, importPath);
  checkDisallowedParameters(meta.parameters);
  var csfFile = {
    meta: meta,
    stories: {}
  };
  Object.keys(namedExports).forEach(function (key) {
    if (Object(_storybook_csf__WEBPACK_IMPORTED_MODULE_4__["isExportStory"])(key, meta)) {
      var storyMeta = Object(_normalizeStory__WEBPACK_IMPORTED_MODULE_6__[/* normalizeStory */ "a"])(key, namedExports[key], meta);
      checkDisallowedParameters(storyMeta.parameters);
      csfFile.stories[storyMeta.id] = storyMeta;
    }
  });
  return csfFile;
}