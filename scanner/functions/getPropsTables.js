function getPropsTables(_ref2) {
  var story = _ref2.story,
      _ref2$config = _ref2.config,
      config = _ref2$config === void 0 ? {} : _ref2$config;
  var types = new Map();
  var excludePropTables = config.excludePropTables,
      includePropTables = config.includePropTables;

  if (!story) {
    return null;
  } // depth-first traverse and collect types


  var extract = function extract(innerChildren) {
    if (!innerChildren) {
      return;
    }

    if (Array.isArray(innerChildren)) {
      innerChildren.forEach(extract);
      return;
    }

    if (innerChildren.props && innerChildren.props.children) {
      extract(innerChildren.props.children);
    } // Exclude specific propTable according to its exclude and include rules.


    if (typeof innerChildren.type === 'function' && (0, _excludePropTable.excludePropTable)(innerChildren, excludePropTables, includePropTables)) {
      return;
    }

    if (innerChildren.type && !types.has(innerChildren.type)) {
      types.set(innerChildren.type, true);
    }
  }; // extract components from children


  extract(story);
  var array = Array.from(types.keys());
  array.sort(function (a, b) {
    return getName(a) > getName(b) ? 1 : -1;
  });
  var propTables = array.map(function (type, i) {
    return getMarkdown({
      name: getName(type),
      config: config,
      type: type
    });
  });

  if (!propTables || propTables.length === 0) {
    return null;
  }

  return propTables;
}