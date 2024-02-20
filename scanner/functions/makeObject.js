function makeObject(givenPath = '', lastValue = {}) {
  const path = givenPath ? givenPath.split('.') : [];
  const result = {};
  let obj = result;
  let key;


  while (path.length > 1) {
    key = path.shift();
    obj = obj[key] = {};
  }

  obj[path.shift()] = lastValue;

  return result;
}