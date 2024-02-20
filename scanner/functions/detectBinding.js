function detectBinding(obj, key, value, m) {
  if (IS_BINDING.test(key)) {
    var bindings = m.bindings;
    if (!bindings) {
      bindings = m.bindings = {};
    } else if (!m.hasOwnProperty('bindings')) {
      bindings = m.bindings = o_create(m.bindings);
    }
    bindings[key] = value;
  }
}