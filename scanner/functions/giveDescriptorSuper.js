function giveDescriptorSuper(meta, key, property, values, descs) {
  var superProperty;

  // Computed properties override methods, and do not call super to them
  if (values[key] === undefined) {
    // Find the original descriptor in a parent mixin
    superProperty = descs[key];
  }

  // If we didn't find the original descriptor in a parent mixin, find
  // it on the original object.
  superProperty = superProperty || meta.descs[key];

  if (!superProperty || !(superProperty instanceof Ember.ComputedProperty)) {
    return property;
  }

  // Since multiple mixins may inherit from the same parent, we need
  // to clone the computed property so that other mixins do not receive
  // the wrapped version.
  property = o_create(property);
  property.func = Ember.wrap(property.func, superProperty.func);

  return property;
}