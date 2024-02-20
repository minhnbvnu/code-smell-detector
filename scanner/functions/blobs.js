function blobs(p) {
  const blobsArray = [];
  const colors = p.random(blobsColors);
  let bgColor = 230;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    generateBlobs(p, blobsArray, colors);
  };

  p.draw = function () {
    p.clear();
    p.background(bgColor);
    p.noStroke();

    blobsArray.forEach((blob) => blob.display(p));
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mousePressed = function () {
    generateBlobs(p, blobsArray, colors, p.mouseX, p.mouseY);
  };

  p.updateWithProps = function (newProps) {
    !newProps.isPlaying ? p.frameRate(0) : p.frameRate(30);
    bgColor = newProps.isDarkMode ? 50 : 230;
  };
}