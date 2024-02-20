function resolveFontStretch(stretch, matchingSet) {
  if (matchingSet[stretch]) {
    return matchingSet[stretch];
  }

  var pivot = fontStretchLookup[stretch];

  // If the font-stretch value is normal or more condensed, we want to
  // start with a descending search, otherwise we should do ascending.
  var dir = pivot <= fontStretchLookup["normal"] ? -1 : 1;
  var match = searchFromPivot(matchingSet, fontStretchOrder, pivot, dir);

  if (!match) {
    // Since a font-family cannot exist without having at least one stretch value
    // we should never reach this point.
    throw new Error(
      "Could not find a matching font-stretch value for " + stretch
    );
  }

  return match;
}