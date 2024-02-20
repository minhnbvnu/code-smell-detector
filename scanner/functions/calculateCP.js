function calculateCP(object, item, errorsForObject) {
  const property = item.name;
  delete errorsForObject[property];
  try {
    if (object instanceof Ember.ArrayProxy && property == parseInt(property)) {
      return object.objectAt(property);
    }
    return item.isGetter || property.includes?.('.')
      ? object[property]
      : object.get?.(property) || object[property]; // need to use `get` to be able to detect tracked props
  } catch (error) {
    errorsForObject[property] = { property, error };
    return new CalculateCPError();
  }
}