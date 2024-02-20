function findSubtiles(searchPattern) {
  searchPattern = new RegExp(searchPattern, 'i');
  var results = [];
  subtitles.forEach(function(subtitle) {
    if (searchPattern.test(subtitle.dialog)) {
      results.push(subtitle);
    };
  });
  return results;
}