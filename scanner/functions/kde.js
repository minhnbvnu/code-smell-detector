function kde(points, i) {
    var bw = bandwidth.call(this, sample);
    return points.map(function(x) {
      var i = -1,
          y = 0,
          n = sample.length;
      while (++i < n) {
        y += kernel((x - sample[i]) / bw);
      }
      return [x, y / bw / n];
    });
  }