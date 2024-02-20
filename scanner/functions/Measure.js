function Measure(data) {
    var elapsed = 0;
    var start = new Date();
    for (var n = 0; elapsed < 1000; n++) {
      benchmark.run();
      elapsed = new Date() - start;
    }
    if (data != null) {
      data.runs += n;
      data.elapsed += elapsed;
    }
  }