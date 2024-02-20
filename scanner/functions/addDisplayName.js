function addDisplayName(displayName, object, state) {
  if (object &&
      object.type === Syntax.CallExpression &&
      object.callee.type === Syntax.MemberExpression &&
      object.callee.object.type === Syntax.Identifier &&
      object.callee.object.name === 'React' &&
      object.callee.property.type === Syntax.Identifier &&
      object.callee.property.name === 'createClass' &&
      object.arguments.length === 1 &&
      object.arguments[0].type === Syntax.ObjectExpression) {
    // Verify that the displayName property isn't already set
    var properties = object.arguments[0].properties;
    var safe = properties.every(function(property) {
      var value = property.key.type === Syntax.Identifier ?
        property.key.name :
        property.key.value;
      return value !== 'displayName';
    });

    if (safe) {
      utils.catchup(object.arguments[0].range[0] + 1, state);
      utils.append('displayName: "' + displayName + '",', state);
    }
  }
}