function visitObjectLiteralSpread(traverse, node, path, state) {
  utils.catchup(node.range[0], state);

  utils.append('Object.assign({', state);

  // Skip the original {
  utils.move(node.range[0] + 1, state);

  var previousWasSpread = false;

  for (var i = 0; i < node.properties.length; i++) {
    var property = node.properties[i];
    if (property.type === Syntax.SpreadProperty) {

      // Close the previous object or initial object
      if (!previousWasSpread) {
        utils.append('}', state);
      }

      if (i === 0) {
        // Normally there will be a comma when we catch up, but not before
        // the first property.
        utils.append(',', state);
      }

      utils.catchup(property.range[0], state);

      // skip ...
      utils.move(property.range[0] + 3, state);

      traverse(property.argument, path, state);

      utils.catchup(property.range[1], state);

      previousWasSpread = true;

    } else {

      utils.catchup(property.range[0], state);

      if (previousWasSpread) {
        utils.append('{', state);
      }

      traverse(property, path, state);

      utils.catchup(property.range[1], state);

      previousWasSpread = false;

    }
  }

  // Strip any non-whitespace between the last item and the end.
  // We only catch up on whitespace so that we ignore any trailing commas which
  // are stripped out for IE8 support. Unfortunately, this also strips out any
  // trailing comments.
  utils.catchupWhiteSpace(node.range[1] - 1, state);

  // Skip the trailing }
  utils.move(node.range[1], state);

  if (!previousWasSpread) {
    utils.append('}', state);
  }

  utils.append(')', state);
  return false;
}