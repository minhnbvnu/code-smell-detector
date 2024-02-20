function withDocsCallAsDecorator(_ref2) {
  var md = _ref2.md;
  return function (story, context) {
    var layout = (0, _getDocsLayout.default)({
      md: md,
      story: story(context)
    });
    var parameters = (0, _getParameters.default)(context);
    return {
      data: function data() {
        return {
          parameters: parameters,
          layout: layout,
          types: [_const.LAYOUT_TYPE_PROPS_TABLE, _const.LAYOUT_TYPE_STORY, _const.LAYOUT_TYPE_MD]
        };
      },
      components: {
        'readme-content': _ReadmeContent.default
      },
      template: "<readme-content\n        v-bind:backward=\"true\"\n        v-bind:types=\"types\"\n        v-bind:withPreview=\"true\"\n        v-bind:theme=\"parameters.theme\"\n        v-bind:codeTheme=\"parameters.codeTheme\"\n        v-bind:layout=\"layout\" />"
    };
  };
}