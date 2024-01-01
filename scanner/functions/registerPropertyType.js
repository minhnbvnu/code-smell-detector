function registerPropertyType (type, defaultValue, parse, stringify) {
  if ('type' in propertyTypes) {
    error('Property type ' + type + ' is already registered.');
    return;
  }

  propertyTypes[type] = {
    default: defaultValue,
    parse: parse || defaultParse,
    stringify: stringify || defaultStringify
  };
}