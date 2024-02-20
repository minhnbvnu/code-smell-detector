function fromJSON(json, inputs) {
  if (Array.isArray(json)) return json.map(function (n) {
    return fromJSON(n);
  });
  var ownInputs = json.inputs,
    defaults = _objectWithoutProperties(json, _excluded);
  if (ownInputs) {
    inputs = [];
    var _iterator = _createForOfIteratorHelper(ownInputs),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var input = _step.value;
        var inputHydrated = _objectSpread(_objectSpread({}, input), {}, {
          __proto__: Input.prototype
        });
        if (inputHydrated.map) {
          inputHydrated.map = _objectSpread(_objectSpread({}, inputHydrated.map), {}, {
            __proto__: PreviousMap.prototype
          });
        }
        inputs.push(inputHydrated);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  if (defaults.nodes) {
    defaults.nodes = json.nodes.map(function (n) {
      return fromJSON(n, inputs);
    });
  }
  if (defaults.source) {
    var _defaults$source = defaults.source,
      inputId = _defaults$source.inputId,
      source = _objectWithoutProperties(_defaults$source, _excluded2);
    defaults.source = source;
    if (inputId != null) {
      defaults.source.input = inputs[inputId];
    }
  }
  if (defaults.type === 'root') {
    return new Root(defaults);
  } else if (defaults.type === 'decl') {
    return new Declaration(defaults);
  } else if (defaults.type === 'rule') {
    return new Rule(defaults);
  } else if (defaults.type === 'comment') {
    return new Comment(defaults);
  } else if (defaults.type === 'atrule') {
    return new AtRule(defaults);
  } else {
    throw new Error('Unknown node type: ' + json.type);
  }
}