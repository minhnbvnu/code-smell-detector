function findMax(img, xstart, ystart, skip) {
  // Brightest so far
  var record = 0;
  var brightest = [0, 0, 0];
  for (var x = 0; x < skip; x++) {
    for (var y = 0; y < skip; y++) {
      // Find the 1D location in the array
      var index = ((x + xstart) + (y + ystart) * img.width) * 4;
      // Look at RGB
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      // Add it up
      var sum = r + g + b;
      // Is this the new brightest pixel?
      if (sum > record) {
        record = sum;
        brightest = [r, g, b];
      }
    }
  }
  // Return the result
  return brightest;
}