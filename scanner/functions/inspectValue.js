function inspectValue(object, key, computedValue) {
  let string;
  const value = computedValue;

  if (arguments.length === 3 && computedValue === undefined) {
    return { type: `type-undefined`, inspect: 'undefined' };
  }

  // TODO: this is not very clean. We should refactor calculateCP, etc, rather than passing computedValue
  if (computedValue !== undefined) {
    return { type: `type-${typeOf(value)}`, inspect: inspect(value) };
  }

  if (value instanceof EmberObject) {
    return { type: 'type-ember-object', inspect: value.toString() };
  } else if (isComputed(object, key)) {
    string = '<computed>';
    return { type: 'type-descriptor', inspect: string };
  } else if (isDescriptor(value)) {
    return { type: 'type-descriptor', inspect: value.toString() };
  } else {
    return { type: `type-${typeOf(value)}`, inspect: inspect(value) };
  }
}