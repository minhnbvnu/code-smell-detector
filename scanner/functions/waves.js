function waves(p) {
  let mountains = [];
  let bgColor = '#e6e6e6';
  let isDarkMode = false;
  let waveColor = bgColor;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    mountains = [];
    growMountains(p, mountains, waveColor);
    p.background(bgColor);
    mountains.forEach((m) => m.display(p));
  };

  p.draw = function () {
    p.background(bgColor);
    mountains.forEach((m) => m.display(p));
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.updateWithProps = function (newProps) {
    !newProps.isPlaying ? p.frameRate(0) : p.frameRate(30);
    bgColor = newProps.isDarkMode ? '#323232' : '#e6e6e6';

    if (isDarkMode !== newProps.isDarkMode || waveColor !== newProps.waveColor) {
      waveColor = newProps.waveColor;
      isDarkMode = newProps.isDarkMode;
      p.setup();
    }
  };

  // p.keyPressed = function () {
  //   if (p.keyCode === 39 || p.keyCode === 37) {
  //     // left or right arrow keys
  //     mountains = [];
  //     growMountains(p, mountains, isDarkMode);
  //     p.background(bgColor);
  //     mountains.forEach((m) => m.display(p));
  //   }
  // };
}