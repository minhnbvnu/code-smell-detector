function getMostSaturatedColor(arr) {
  var maxSat = 0;
  var c = color(0);
  for (var i = 0; i < arr.length; i++) {
    var cc = arr[i];
    var sat = saturation(cc) + brightness(cc);
    if (sat > maxSat) {
      c = cc;
      maxSat = sat;
    }
  }
  return c;
}