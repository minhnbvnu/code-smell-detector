function withReadmeCallAsDecorator(_ref) {
  var md = _ref.md;
  return function (story, context) {
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