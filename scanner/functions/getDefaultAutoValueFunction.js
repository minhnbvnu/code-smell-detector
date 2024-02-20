function getDefaultAutoValueFunction(defaultValue) {
  return function defaultAutoValueFunction() {
    if (this.isSet) return;
    if (this.operator === null) return defaultValue;

    // Handle the case when pulling an object from an array the object contains a field
    // which has a defaultValue. We don't want the default value to be returned in this case
    if (this.operator === '$pull') return;

    // Handle the case where we are $pushing an object into an array of objects and we
    // want any fields missing from that object to be added if they have default values
    if (this.operator === '$push') return defaultValue;

    // If parent is set, we should update this position instead of $setOnInsert
    if (this.parentField().isSet) return defaultValue;

    // Make sure the default value is added on upsert insert
    if (this.isUpsert) return { $setOnInsert: defaultValue };
  };
}