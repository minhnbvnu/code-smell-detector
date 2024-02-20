function getDocsLayout(_ref) {
  var md = _ref.md,
      story = _ref.story,
      _ref$excludePropTable = _ref.excludePropTables,
      excludePropTables = _ref$excludePropTable === void 0 ? [] : _ref$excludePropTable,
      _ref$includePropTable = _ref.includePropTables,
      includePropTables = _ref$includePropTable === void 0 ? [] : _ref$includePropTable;
  var mdAsArray = Array.isArray(md) ? (0, _toConsumableArray2.default)(md) : [md]; // const mdWithEmojis = mdAsArray.map(md => transformEmojis(md));

  var mdWithEmojis = mdAsArray.map(processMd);
  var main = mdWithEmojis[0];
  var propTables = (0, _validatePropTables.validatePropTables)(excludePropTables, includePropTables);
  var layout = (0, _toConsumableArray2.default)(split(main, story, propTables));
  mdWithEmojis.slice(1).map(function (md) {
    layout.push.apply(layout, (0, _toConsumableArray2.default)(split(md, story, propTables)));
  });

  if (layout.findIndex(function (p) {
    return p.type === _const.LAYOUT_TYPE_STORY;
  }) === -1) {
    layout.push({
      type: _const.LAYOUT_TYPE_STORY,
      content: story
    });
  }

  var config = (0, _config.getConfig)();

  if (config.footer) {
    layout.push({
      type: _const.LAYOUT_TYPE_FOOTER_MD,
      content: processMd(config.footer)
    });
  }

  if (config.header) {
    layout.unshift({
      type: _const.LAYOUT_TYPE_HEADER_MD,
      content: processMd(config.header)
    });
  }

  return layout;
}