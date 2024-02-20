function applyMergedProperties(obj, key, value, values) {
  var baseValue = values[key] || obj[key];

  if (!baseValue) { return value; }

  var newBase = Ember.merge({}, baseValue);
  for (var prop in value) {
    if (!value.hasOwnProperty(prop)) { continue; }

    var propValue = value[prop];
    if (isMethod(propValue)) {
      // TODO: support for Computed Properties, etc?
      newBase[prop] = giveMethodSuper(obj, prop, propValue, baseValue, {});
    } else {
      newBase[prop] = propValue;
    }
  }

  return newBase;
}