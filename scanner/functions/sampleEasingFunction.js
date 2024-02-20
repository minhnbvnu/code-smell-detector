function sampleEasingFunction(easing) {
    var DURATION = 300;
    var tickCount = Math.round(DURATION * 60 / 1000);
    var samples = [];
    for (var i = 0; i <= tickCount; i++) {
      samples.push(easing(i / tickCount));
    }
    return samples;
  }