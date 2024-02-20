function extractEventHiddenProperties(event) {
  var rebuildEvent = eventProperties.filter(function (value) {
    return event[value] !== undefined;
  }).reduce(function (acc, value) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, value, event[value]));
  }, {});

  if (event instanceof CustomEvent) {
    customEventSpecificProperties.filter(function (value) {
      return event[value] !== undefined;
    }).forEach(function (value) {
      rebuildEvent[value] = event[value];
    });
  }

  return rebuildEvent;
}