function sanitizeStoryContextUpdate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var componentId = _ref.componentId,
      title = _ref.title,
      kind = _ref.kind,
      id = _ref.id,
      name = _ref.name,
      story = _ref.story,
      parameters = _ref.parameters,
      initialArgs = _ref.initialArgs,
      argTypes = _ref.argTypes,
      update = _objectWithoutProperties(_ref, _excluded);

  return update;
}