function getArtboardInfo(settings) {
  var artboards = [];
  forEachUsableArtboard(function(ab, i) {
    artboards.push({
      effectiveWidth: getArtboardWidth(ab),
      responsiveness: getArtboardResponsiveness(ab, settings),
      id: i
    });
  });
  artboards.sort(function(a, b) {return a.effectiveWidth - b.effectiveWidth;});
  return artboards;
}