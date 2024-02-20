function deleteUndefined(obj) {
  // eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach(function (key) {
    return obj[key] === undefined && delete obj[key];
  });
  return obj;
}