function eachObj(obj, iteratee, context) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      iteratee.call(context || obj, key, obj[key]);
    }
  }
}