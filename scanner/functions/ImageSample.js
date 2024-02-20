function ImageSample(img, index, y, h) {
  this.index = index;
  this.img = img.get(0, img.height * y, img.width, img.height * h);
  this.img.loadPixels();
  var colorCount = 100;
  var quality = 1;
  var sampledPixels = [];
  for (var i = 0, offset, r, g, b, a; i < this.img.pixels.length; i += quality) {
    offset = i * 4;
    r = this.img.pixels[offset + 0];
    g = this.img.pixels[offset + 1];
    b = this.img.pixels[offset + 2];
    a = this.img.pixels[offset + 3];
    if (a >= 125) {
      if (!(r > 250 && g > 250 && 250)) {
        sampledPixels.push([r, g, b]);
      }
    }
  }

  this.cmap = MMCQ.quantize(sampledPixels, colorCount);

  var satColor = this.cmap ? color(getMostSaturatedColor(this.cmap.palette())) : color(0);
  var satColorNotGreen = this.cmap ? color(getMostSaturatedColorNotGreen(this.cmap.palette())) : color(0);
  var satValue = saturation(satColorNotGreen);
  var bestColor = satValue > 50 ? satColorNotGreen : satColor;

  this.sampleColor = this.cmap ? whiteToAlpha(bestColor) : color(255);
}