function getPublicMethods(object) {
  const proto = object && Object.getPrototypeOf(object);

  if (!proto) {
    return {};
  }

  if (object.constructor.hasOwnProperty('_publicMethods')) {
    return object.constructor._publicMethods;
  }

  const result = {};
  const properties = Object.getOwnPropertyNames(object);
  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];

    if (key !== 'constructor' && key[0] !== '_' && typeof object[key] === 'function') {
      result[key] = getArguments(object[key]);
    }
  }

  Object.assign(result, getPublicMethods(proto));

  Object.defineProperty(object.constructor, '_publicMethods', {
    enumerable: false,
    value: result
  });

  return object.constructor._publicMethods;
}