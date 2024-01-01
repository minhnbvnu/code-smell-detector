function addComponentMapping (componentName, mappings) {
  var schema = components[componentName].schema;
  Object.keys(schema).map(function (prop) {
    // Hyphenate where there is camelCase.
    var attrName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    // If there is a mapping collision, prefix with component name and hyphen.
    if (mappings[attrName] !== undefined) { attrName = componentName + '-' + prop; }
    mappings[attrName] = componentName + '.' + prop;
  });
}