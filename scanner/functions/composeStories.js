function composeStories(storiesImport, globalConfig, composeStoryFn) {
  var meta = storiesImport.default,
      __esModule = storiesImport.__esModule,
      __namedExportsOrder = storiesImport.__namedExportsOrder,
      stories = _objectWithoutProperties(storiesImport, _excluded);

  var composedStories = Object.entries(stories).reduce(function (storiesMap, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        exportsName = _ref2[0],
        story = _ref2[1];

    if (!Object(_storybook_csf__WEBPACK_IMPORTED_MODULE_14__["isExportStory"])(exportsName, meta)) {
      return storiesMap;
    }

    var result = Object.assign(storiesMap, _defineProperty({}, exportsName, composeStoryFn(story, meta, globalConfig, exportsName)));
    return result;
  }, {});
  return composedStories;
}