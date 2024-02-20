function registerComputedWithProperties(name, macro) {
  Ember.computed[name] = function() {
    var properties = a_slice.call(arguments);

    var computed = Ember.computed(function() {
      return macro.apply(this, [getProperties(this, properties)]);
    });

    return computed.property.apply(computed, properties);
  };
}