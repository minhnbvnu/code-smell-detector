function generateMontage() {
  clearTimeout(fragmentTimer);
  video.stop();
  selectAll('.subtitle').forEach(function(dialogElement) {
    dialogElement.remove();
  });
  video.elt.style.width = tileMode ? '25%' : '100%';
  video.position(0, 0);
  video.show();
  clear();
  row = 0;
  col = 0;

  searchResults = findSubtiles(searchQuery);
  print(
    'Found ' + searchResults.length + ' results for search query ' + searchQuery,
    searchResults
  );

  if (searchResults.length) {
    resizeCanvas(windowWidth, searchResults.length * video.size().height);
    video.play();
    video.speed(1);
    queryResultMontage(searchResults, 0);
  }
}