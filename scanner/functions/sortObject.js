function sortObject(object) {
  const sortedObject = {};
  Object.keys(object).sort().forEach(item => {
    sortedObject[item] = object[item];
  });
  return sortedObject;
}