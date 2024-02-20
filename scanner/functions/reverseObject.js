function reverseObject(/*object*/ object) /*object*/ {
  var reversed = {};
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      reversed[object[key]] = key;
    }
  }
  return reversed;
}