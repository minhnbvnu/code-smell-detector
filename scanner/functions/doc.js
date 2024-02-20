function doc(_ref3) {
  var md = _ref3.md;
  var layout = (0, _getDocsLayout.default)({
    md: md,
    story: null
  });
  return function (context) {
    var parameters = (0, _getParameters.default)(context);
    return {
      data: function data() {
        return {
          parameters: parameters,
          layout: layout
        };
      },
      components: {
        'readme-content': _ReadmeContent.default
      },
      template: "<readme-content\n        v-bind:backward=\"true\" \n        v-bind:theme=\"parameters.theme\"\n        v-bind:codeTheme=\"parameters.codeTheme\"\n        v-bind:layout=\"layout\" />"
    };
  };
}