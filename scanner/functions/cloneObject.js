function cloneObject(object) {
  const clone = {};
  for (const key in object) {
    clone[key] = object[key];
  }
  return clone;
}