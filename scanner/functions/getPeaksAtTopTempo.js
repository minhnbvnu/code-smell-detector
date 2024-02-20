function getPeaksAtTopTempo(peaksObj, tempo, sampleRate, bpmVariance) {
    var peaksAtTopTempo = [];
    var peaksArray = Object.keys(peaksObj).sort();
    // TO DO: filter out peaks that have the tempo and return
    for (var i = 0; i < peaksArray.length; i++) {
      var key = peaksArray[i];
      var peak = peaksObj[key];
      for (var j = 0; j < peak.intervals.length; j++) {
        var intervalBPM = Math.round(Math.abs(60 / (peak.intervals[j] / sampleRate)));
        intervalBPM = mapTempo(intervalBPM);
        var dif = intervalBPM - tempo;
        if (Math.abs(intervalBPM - tempo) < bpmVariance) {
          // convert sampleIndex to seconds
          peaksAtTopTempo.push(peak.sampleIndex / 44100);
        }
      }
    }
    // filter out peaks that are very close to each other
    peaksAtTopTempo = peaksAtTopTempo.filter(function (peakTime, index, arr) {
      var dif = arr[index + 1] - peakTime;
      if (dif > 0.01) {
        return true;
      }
    });
    return peaksAtTopTempo;
  }