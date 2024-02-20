function inject(_ref) {
  var components = _ref.components,
      helpers = _ref.helpers;
  return function (ControllerType) {
    if (components) {
      ControllerType.components = components;
    }

    if (helpers) {
      ControllerType.helpers = helpers;
    }
  };
}