function applyConcatenatedProperties(obj, key, value, values) {
  var baseValue = values[key] || obj[key];

  if (baseValue) {
    if ('function' === typeof baseValue.concat) {
      return baseValue.concat(value);
    } else {
      return Ember.makeArray(baseValue).concat(value);
    }
  } else {
    return Ember.makeArray(value);
  }
}