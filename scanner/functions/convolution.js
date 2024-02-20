function convolution(img, x, y, kernel, kernelsize) {

  // Going to sum the RGB values of all the pixels
  var rsum = 0.0;
  var gsum = 0.0;
  var bsum = 0.0;

  // Offset around the center pixel
  var offset = floor(kernelsize / 2);

  // Loop through convolution kernel
  for (var i = 0; i < kernelsize; i++) {
    for (var j = 0; j < kernelsize; j++) {

      // What pixel are we testing
      var xpos = x + i - offset;
      var ypos = y + j - offset;
      // Find the 1D location in the array
      var index = (xpos + img.width * ypos) * 4;

      // Make sure we haven't walked off the edge of the pixel array
      // It is often good when looking at neighboring pixels to make sure we have not gone off the edge of the pixel array by accident.
      index = constrain(index, 0, img.pixels.length - 1);

      // Calculate the convolution
      // We sum all the neighboring pixels
      // multiplied by the weights in the convolution kernel.
      rsum += img.pixels[index + 0] * kernel[i][j];
      gsum += img.pixels[index + 1] * kernel[i][j];
      bsum += img.pixels[index + 2] * kernel[i][j];
    }
  }

  // An artificial demonstration of ReLU
  if (relu.checked()) {
    // Negative pixel values would be capped as in the pseudo-code below:
    // sum = constrain(sum, 0, 255);
  } else {
    // To contrast with the effects of ReLU, here, we will map negative pixel values into the positive range.
    rsum = map(rsum, -255, 255, 0, 255);
    gsum = map(gsum, -255, 255, 0, 255);
    bsum = map(bsum, -255, 255, 0, 255);
  }

  // Return an array with the three color values
  return [rsum, gsum, bsum];
}