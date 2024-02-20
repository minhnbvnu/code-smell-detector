function processSamples(samples, numFrames, samplesPerFrame) {

  // TODO spread out slop across frames
  var perFrame = Math.floor(samples.length / numFrames),
      perPoint = Math.floor(perFrame / samplesPerFrame),
      range = d3.range(samplesPerFrame),
      maxFrame,
      maxRms = maxMid = 0;

  var unadjusted = d3.range(numFrames).map(function(frame){

    var frameSamples = samples.slice(frame * perFrame, (frame + 1) * perFrame),
        points = range.map(function(point){

          var pointSamples = frameSamples.slice(point * perPoint, (point + 1) * perPoint),
              midpoint = pointSamples[Math.floor(pointSamples.length / 2)];

          var rms = Math.sqrt(d3.sum(pointSamples.map(function(d){
            return d * d;
          })) / perPoint);

          if (rms > maxRms) {
            maxRms = rms;
            maxFrame = frame;
          }

          if (Math.abs(midpoint) > maxMid) {
            maxMid = Math.abs(midpoint);
          }

          // Min value, max value, and midpoint value
          return [rms, midpoint];

        });

    return points;

  });

  var adjusted = unadjusted.map(function(frame){
    return frame.map(function(point){
      return [
        point[0] / maxRms,
        point[1] / maxMid
      ];
    });
  });

  // Make first and last frame peaky
  adjusted[0] = adjusted[numFrames - 1] = adjusted[maxFrame];

  return adjusted;

}