function cloneObject(obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      var newArr = [];
      obj.forEach(function(item, index) {
        newArr[index] = cloneObject(item);
      });
      return newArr;
    } else {
      var newObj = {};
      for (var key in obj) {
        newObj[key] = cloneObject(obj[key]);
      }
      return newObj;
    }
  } else {
    return obj;
  }
}