function withCallType(_ref) {
  var type = _ref.type;

  if (type === DOC) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return handler.doc({
        md: args
      });
    };
  }

  var typeHandler = null;

  switch (type) {
    case WITH_README:
      typeHandler = handler.withReadme;
      break;

    case WITH_DOCS:
      typeHandler = handler.withDocs;
      break;

    default:
      throw new Error('storybook-readme: wrong type (withCallType)');
  }

  return function () {
    switch (true) {
      /**
       * withDocs({
       *  preview: props => {}
       *  footer: props => {}
       * })(README)
       */
      case arguments.length === 1 && (0, _isPlainObject.default)(arguments.length <= 0 ? undefined : arguments[0]):
        {
          console.log("\nstorybook-readme:\n\n\"withDocs()\" as configurable function call is deprecated and do nothing at v5.0.0:\n\nwithDocs({\n  preview: props => {}\n  footer: props => {}\n})(README);\n      \n");
          return withCallType({
            type: type
          });
        }

      /**
       * .addDecorator(
       *  withDocs(README)
       * )
       *
       * .addDecorator(
       *  withDocs([README1, README2])
       * )
       */

      case arguments.length === 1 && ((0, _isString.default)(arguments.length <= 0 ? undefined : arguments[0]) || (0, _isArray.default)(arguments.length <= 0 ? undefined : arguments[0])):
        {
          return typeHandler.callAsDecorator({
            md: arguments.length <= 0 ? undefined : arguments[0]
          });
        }

      /**
       * withDocs(README, story)
       * withDocs([README1, README2], story)
       */

      case arguments.length === 2:
        {
          return typeHandler.callAsHoc({
            md: arguments.length <= 0 ? undefined : arguments[0],
            story: arguments.length <= 1 ? undefined : arguments[1]
          });
        }

      default:
        {
          throw new Error('storybook-readme: wrong arguments withReadme / withDocs /doc');
        }
    }
  };
}