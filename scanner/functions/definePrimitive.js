function definePrimitive (tagName, defaultComponents, mappings) {
  // If no initial mappings provided, start from empty map.
  mappings = mappings || {};

  // From the default components, add mapping automagically.
  Object.keys(defaultComponents).map(function buildMappings (componentName) {
    addComponentMapping(componentName, mappings);
  });

  // Register the primitive.
  module.exports.registerPrimitive(tagName, utils.extendDeep({}, null, {
    defaultComponents: defaultComponents,
    mappings: mappings
  }));
}