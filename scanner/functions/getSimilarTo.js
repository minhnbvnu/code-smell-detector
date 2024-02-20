function getSimilarTo(subName) {
  var similar = indexedSimilarity.get(subName);
  similar.sort((a, b) => b.score - a.score)
  similar = similar.slice(0, 100);

  var mean = 0;
  similar.forEach(x => mean += x.score);
  mean /= similar.length;

  var stdDev = 0;
  similar.forEach(x => stdDev += (x.score - mean) * (x.score - mean));
  stdDev /= similar.length;
  stdDev = Math.sqrt(stdDev);

  var medianIndex = Math.floor(similar.length/2);
  var median = similar[medianIndex].score;

  var foundMatches = []
  for (var i = 0; i < similar.length; ++i) {
    var sim = similar[i];
    if (sim.score - median > stdDev) {
      foundMatches.push({
        sub: sim.sub,
        score: sim.score
      })
    } else {
      // since array is sorted, there is nothing interesting left at this point
      break;
    }
  }

  return {
    name: subName,
    similar: foundMatches
  }
}