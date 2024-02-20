function getPrimitiveData(primitiveObject) {
  const {currentMajorVersion} = getXVIZConfig();

  if (currentMajorVersion === 1) {
    if (primitiveObject instanceof Array) {
      if (primitiveObject.length === 0) {
        // The empty array implies 'no data' for this object, which is distinct
        // from 'absence of data' which would happen if there was not primitive entry at all
        return {type: null, primitives: primitiveObject};
      } else if (primitiveObject.length > 0) {
        // This is populated primitive data
        return {type: primitiveObject[0].type, primitives: primitiveObject};
      }
    }
  }

  if (currentMajorVersion === 2) {
    // Primitives have the type as the first key
    const keys = Object.keys(primitiveObject);

    for (const type of keys) {
      if (PrimitiveTypes.includes(type)) {
        // Types in v2 are the plural form, but lookup in xviz-primitives-2.js
        // uses singular, ie points -> point
        const singularType = type.slice(0, -1);
        return {type: singularType, primitives: primitiveObject[type]};
      }
    }
  }

  // TODO(twojtasz): Cleanup data flow as downstream expects an object rather than an error.
  return {};
}