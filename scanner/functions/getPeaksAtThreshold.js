function getPeaksAtThreshold(data, threshold) {
    var peaksObj = {};
    var length = data.length;
    for (var i = 0; i < length; i++) {
      if (data[i] > threshold) {
        var amp = data[i];
        var peak = new Peak(amp, i);
        peaksObj[i] = peak;
        // Skip forward ~ 1/8s to get past this peak.
        i += 6000;
      }
      i++;
    }
    return peaksObj;
  }