function unpackJsonArraysRecursive(json, topJson, buffers, options = {}) {
  const object = json;

  const buffer = decodeJSONPointer(object, buffers);
  if (buffer) {
    return buffer;
  }

  // Copy array
  if (Array.isArray(object)) {
    return object.map(element => unpackJsonArraysRecursive(element, topJson, buffers, options));
  }

  // Copy object
  if (object !== null && typeof object === 'object') {
    const newObject = {};
    for (const key in object) {
      newObject[key] = unpackJsonArraysRecursive(object[key], topJson, buffers, options);
    }
    return newObject;
  }

  return object;
}