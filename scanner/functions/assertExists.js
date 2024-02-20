function assertExists(obj, field) {
  if (obj[field] == null) {
    throw new Error('Modules must have `' + field + '`');
  }
}