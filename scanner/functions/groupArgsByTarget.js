function groupArgsByTarget(_ref7) {
  var args = _ref7.args,
      argTypes = _ref7.argTypes;
  var groupedArgs = {};
  Object.entries(args).forEach(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        name = _ref9[0],
        value = _ref9[1];

    var _ref10 = argTypes[name] || {},
        _ref10$target = _ref10.target,
        target = _ref10$target === void 0 ? NO_TARGET_NAME : _ref10$target;

    groupedArgs[target] = groupedArgs[target] || {};
    groupedArgs[target][name] = value;
  });
  return groupedArgs;
}