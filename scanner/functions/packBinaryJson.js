function packBinaryJson(json, gltfBuilder, objectKey = null, options = {}) {
  const {flattenArrays = true} = options;
  let object = json;
  let objectInfo = null;

  // Check if string has same syntax as our "JSON pointers", if so "escape it".
  if (typeof object === 'string' && object.indexOf('#/') === 0) {
    return `#${object}`;
  }

  if (Array.isArray(object)) {
    // TODO - handle numeric arrays, flatten them etc.
    const flatObject = flattenArrays && flattenObject(objectKey, object);
    if (flatObject) {
      object = flatObject.typedArray;
      objectInfo = flatObject;
    } else {
      return object.map(element => packBinaryJson(element, gltfBuilder, null, options));
    }
  }

  // Typed arrays, pack them as binary
  if (ArrayBuffer.isView(object) && gltfBuilder) {
    if (options && options.isImage) {
      objectInfo = {...objectInfo, isImage: true};
    }
    return packBinaryJsonTypedArray(gltfBuilder, object, objectKey, objectInfo);
  }

  if (object !== null && typeof object === 'object') {
    const newObject = {};
    for (const key in object) {
      // Detect XVIZ Image entry and mark appropriately
      if (['data', 'width_px', 'height_px'].every(field => field in object)) {
        options = {...options, isImage: true};
      }
      newObject[key] = packBinaryJson(object[key], gltfBuilder, key, options);
    }
    return newObject;
  }

  return object;
}