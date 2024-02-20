function getDestructuredComponents(node, state) {
  var tmpIndex = state.localScope.tempVarIndex;
  var components = [];
  var patternItems = getPatternItems(node);

  for (var idx = 0; idx < patternItems.length; idx++) {
    var item = patternItems[idx];
    if (!item) {
      continue;
    }

    if (item.type === Syntax.SpreadElement) {
      // Spread/rest of an array.
      // TODO(dmitrys): support spread in the middle of a pattern
      // and also for function param patterns: [x, ...xs, y]
      components.push(item.argument.name +
        '=Array.prototype.slice.call(' +
        utils.getTempVar(tmpIndex) + ',' + idx + ')'
      );
      continue;
    }

    if (item.type === Syntax.SpreadProperty) {
      var restExpression = restPropertyHelpers.renderRestExpression(
        utils.getTempVar(tmpIndex),
        patternItems
      );
      components.push(item.argument.name + '=' + restExpression);
      continue;
    }

    // Depending on pattern type (Array or Object), we get
    // corresponding pattern item parts.
    var accessor = getPatternItemAccessor(node, item, tmpIndex, idx);
    var value = getPatternItemValue(node, item);

    // TODO(dmitrys): implement default values: {x, y=5}
    if (value.type === Syntax.Identifier) {
      // Simple pattern item.
      components.push(value.name + '=' + accessor);
    } else {
      // Complex sub-structure.
      components.push(
        utils.getTempVar(++state.localScope.tempVarIndex) + '=' + accessor +
        ',' + getDestructuredComponents(value, state)
      );
    }
  }

  return components.join(',');
}