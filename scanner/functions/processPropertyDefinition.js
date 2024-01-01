function processPropertyDefinition (propDefinition, componentName) {
  var defaultVal = propDefinition.default;
  var isCustomType;
  var propType;
  var typeName = propDefinition.type;

  // Type inference.
  if (!propDefinition.type) {
    if (defaultVal !== undefined &&
        (typeof defaultVal === 'boolean' || typeof defaultVal === 'number')) {
      // Type inference.
      typeName = typeof defaultVal;
    } else if (Array.isArray(defaultVal)) {
      typeName = 'array';
    } else {
      // Fall back to string.
      typeName = 'string';
    }
  } else if (propDefinition.type === 'bool') {
    typeName = 'boolean';
  } else if (propDefinition.type === 'float') {
    typeName = 'number';
  }

  propType = propertyTypes[typeName];
  if (!propType) {
    warn('Unknown property type for component `' + componentName + '`: ' + typeName);
  }

  // Fill in parse and stringify using property types.
  isCustomType = !!propDefinition.parse;
  propDefinition.parse = propDefinition.parse || propType.parse;
  propDefinition.stringify = propDefinition.stringify || propType.stringify;

  // Fill in type name.
  propDefinition.type = typeName;

  // Check that default value exists.
  if ('default' in propDefinition) {
    // Check that default values are valid.
    if (!isCustomType && !isValidDefaultValue(typeName, defaultVal)) {
      warn('Default value `' + defaultVal + '` does not match type `' + typeName +
           '` in component `' + componentName + '`');
    }
  } else {
    // Fill in default value.
    propDefinition.default = propType.default;
  }

  return propDefinition;
}