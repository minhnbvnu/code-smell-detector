function maxpool(img, skip, xoff, yoff) {
  // Check all the pixels
  for (var x = 0; x < img.width; x += skip) {
    for (var y = 0; y < img.height; y += skip) {
      // Find the brightest pixel
      var brightest = findMax(img, x, y, skip);
      // Draw the rectangle
      fill(brightest[0], brightest[1], brightest[2]);
      noStroke();
      rectMode(CORNER);
      rect(x + xoff, y + yoff, skip, skip);
    }
  }
}