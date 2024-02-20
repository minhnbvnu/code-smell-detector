function getMostSaturatedColorNotGreen(arr) {
  var maxSat = 0;
  var c = color(0);
  for (var i = 0; i < arr.length; i++) {
    var cc = arr[i];
    if (abs(hue(cc) - hue(primaryGreen)) < 30) {
      // console.log("similar");
      continue;
    }
    var sat = saturation(cc) + brightness(cc);
    if (sat > maxSat) {
      c = cc;
      maxSat = sat;
    }
  }
  return c;
}