function replaceProperty(properties, name, value, options) {
  let found;

  let i, l;
  for (i = 0, l = properties.length; i < l; i++) {
    if (properties[i].name === name) {
      found = i;
      break;
    }
  }

  if (found) {
    properties.splice(i, 1);
  }

  let prop = { name, value };
  prop.isMandatorySetter = options.isMandatorySetter;
  prop.readOnly = options.readOnly;
  prop.auto = options.auto;
  prop.canTrack = options.canTrack;
  prop.isComputed = options.isComputed;
  prop.isProperty = options.isProperty;
  prop.isTracked = options.isTracked;
  prop.isGetter = options.isGetter;
  prop.dependentKeys = options.dependentKeys || [];
  let hasServiceFootprint =
    prop.value && typeof prop.value.inspect === 'string'
      ? prop.value.inspect.includes('@service:')
      : false;
  prop.isService = options.isService || hasServiceFootprint;
  prop.code = options.code;
  properties.push(prop);
}