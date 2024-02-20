function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50;
    var n_samples = 44100;
    var curve = new Float32Array(n_samples);
    var deg = Math.PI / 180;
    var i = 0;
    var x;
    for (; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }