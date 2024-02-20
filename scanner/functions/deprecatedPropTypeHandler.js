function deprecatedPropTypeHandler(documentation, path) {
  var propTypesPath = docgen.utils.getMemberValuePath(path, 'propTypes');
  if (!propTypesPath) {
    return;
  }

  propTypesPath = docgen.utils.resolveToValue(propTypesPath);
  if (!propTypesPath || propTypesPath.node.type !== 'ObjectExpression') {
    return;
  }

  // Checks for deprecatedPropType function and add deprecation info.
  propTypesPath.get('properties').each(function(propertyPath) {
    var valuePath = docgen.utils.resolveToValue(propertyPath.get('value'));
    // If it's a call to deprecatedPropType, do stuff
    if (valuePath.node.type !== 'CallExpression' ||
        valuePath.node.callee.name !== 'deprecatedPropType') {
      return;
    }
    var propDescriptor = documentation.getPropDescriptor(
      docgen.utils.getPropertyName(propertyPath)
    );
    // The 2nd argument of deprecatedPropType is the deprecation message.
    // Used printValue to get the string otherwise there was issues with template
    // strings.
    propDescriptor.deprecationMessage = docgen.utils
      .printValue(valuePath.get('arguments', 1))
      // Remove the quotes printValue adds.
      .slice(1, -1);

    // Get the actual prop type.
    propDescriptor.type = docgen.utils.getPropType(
      valuePath.get('arguments', 0)
    );
  });
}