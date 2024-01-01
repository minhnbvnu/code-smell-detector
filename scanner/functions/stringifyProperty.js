function stringifyProperty (value, propDefinition) {
  // This function stringifies but it's used in a context where
  // there's always second stringification pass. By returning the original
  // value when it's not an object we save one unnecessary call
  // to JSON.stringify.
  if (typeof value !== 'object') { return value; }
  // if there's no schema for the property we use standar JSON stringify
  if (!propDefinition || value === null) { return JSON.stringify(value); }
  return propDefinition.stringify(value);
}