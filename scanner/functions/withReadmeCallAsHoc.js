function withReadmeCallAsHoc(_ref2) {
  var md = _ref2.md,
      story = _ref2.story;
  return function (context) {
    var storyComponent = story(context);
    var layout = (0, _getDocsLayout.default)({
      md: md,
      story: storyComponent
    });
    var parameters = (0, _getParameters.default)(context);

    _addons.default.getChannel().emit(_const.CHANNEL_SET_SIDEBAR_DOCS, {
      layout: layout,
      theme: parameters.theme,
      codeTheme: parameters.codeTheme
    });

    return storyComponent;
  };
}