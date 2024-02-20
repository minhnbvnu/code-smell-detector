function checkObjectType(object, method) {
  const typeofObject = object === null ? 'null' : typeof object;

  if (typeofObject !== 'object' && typeofObject !== 'function') {
    throw seempleError('common:object_type', {
      object,
      method
    });
  }
}