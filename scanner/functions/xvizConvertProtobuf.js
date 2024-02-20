function xvizConvertProtobuf(object, keyName) {
  if (Array.isArray(object)) {
    if (!(keyName === 'vertices' || keyName === 'points' || keyName === 'colors')) {
      return object.map(element => xvizConvertProtobuf(element, keyName));
    }

    // Handle the following cases
    // [ [x, y, z], [x, y, z], ...]
    // [ TypedArray{x, y, z}, TypedArray{x, y ,z} ]
    // [ x, y, z, x, y, z, ... ]
    // [ {}, {}, ... ]
    if (Array.isArray(object[0])) {
      const flat = [];
      object.forEach(el => flat.push(...el));
      return flat;
    } else if (ArrayBuffer.isView(object[0])) {
      const flat = [];
      object.forEach(el => flat.push(...Array.from(el)));
      return flat;
    } else if (Number.isFinite(object[0])) {
      return object;
    } else if (typeof object[0] === 'object') {
      return object.map(element => xvizConvertProtobuf(element, keyName));
    }
  }

  // Typed arrays become normal arrays
  if (ArrayBuffer.isView(object)) {
    return Array.from(object);
  }

  if (COLOR_KEYS.includes(keyName)) {
    if (typeof object === 'string' && object.match(/^#([0-9a-f]{3,4})|([0-9a-f]{6,8})$/i)) {
      return toColorArray(object);
    }
  }

  if (object !== null && typeof object === 'object') {
    // Handle XVIZ Image Primitive
    const properties = Object.keys(object);
    if (properties.includes('data') && keyName === 'images') {
      // TODO: should verify it is a typed array and if not convert it to one
      return object;
    }

    // Handle all other objects
    const newObject = {};
    const objectKeys = Object.keys(object);
    for (const key of objectKeys) {
      // console.log(key)
      newObject[key] = xvizConvertProtobuf(object[key], key);
    }
    return newObject;
  }

  return object;
}