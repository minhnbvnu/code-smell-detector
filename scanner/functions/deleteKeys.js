function deleteKeys(obj, keysObj) {
  for (let key in keysObj) {
    if (typeof keysObj[key] === 'object' && keysObj[key] !== null) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
        deleteKeys(obj[key], keysObj[key]);
      }
    } else if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  }
  return obj;
}