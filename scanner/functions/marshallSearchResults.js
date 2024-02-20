function marshallSearchResults(results, displayPageNumberFn, preTag, postTag) {
  // Attach matchIndex to a few things to make it easier to identify
  // an active/selected match
  for (const [index, match] of results.matches.entries()) {
    match.matchIndex = index;
    match.displayPageNumber = displayPageNumberFn(match.par[0].page);
    match.html = renderMatch(match.text, preTag, postTag);
    for (const par of match.par) {
      for (const box of par.boxes) {
        box.matchIndex = index;
      }
    }
  }
}