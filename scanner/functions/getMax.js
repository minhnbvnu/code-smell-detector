function getMax(arr) {

  var max = -Infinity;

  for (var i = 0, l = arr.length; i < l; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;

}