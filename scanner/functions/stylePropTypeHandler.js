function stylePropTypeHandler(documentation, path) {
  var propTypesPath = docgen.utils.getMemberValuePath(path, 'propTypes');
  if (!propTypesPath) {
    return;
  }

  propTypesPath = docgen.utils.resolveToValue(propTypesPath);
  if (!propTypesPath || propTypesPath.node.type !== 'ObjectExpression') {
    return;
  }

  // Check if the there is a style prop
  propTypesPath.get('properties').each(function(propertyPath) {
    if (propertyPath.node.type !== 'Property' ||
        docgen.utils.getPropertyName(propertyPath) !== 'style') {
      return;
    }
    var valuePath = docgen.utils.resolveToValue(propertyPath.get('value'));
    // If it's a call to StyleSheetPropType, do stuff
    if (valuePath.node.type !== 'CallExpression' ||
        valuePath.node.callee.name !== 'StyleSheetPropType') {
      return;
    }
    // Get type of style sheet
    var styleSheetModule = docgen.utils.resolveToModule(
      valuePath.get('arguments', 0)
    );
    if (styleSheetModule) {
      var propDescriptor = documentation.getPropDescriptor('style');
      propDescriptor.type = {name: 'stylesheet', value: styleSheetModule};
    }
  });
}