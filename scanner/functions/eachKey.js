function eachKey(obj, fn, target) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(target, key, obj[key]);
    }
  }
}