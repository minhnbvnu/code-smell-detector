function getFramePos() {
  frameWidth = video.size().width;
  frameHeight = video.size().height;
  var x = frameWidth * col;
  var y = frameHeight * row;
  if (x + frameWidth > width) {
    col = 0;
    row++;
    x = frameWidth * col;
    y = frameHeight * row;
  }
  return createVector(x, y);
}