function resolveFontWeight(weight, matchingSet) {
  if (matchingSet[weight]) {
    return matchingSet[weight];
  }

  if (weight === 400 && matchingSet[500]) {
    return matchingSet[500];
  }

  if (weight === 500 && matchingSet[400]) {
    return matchingSet[400];
  }

  var pivot = fontWeightsLookup[weight];

  // If the font-stretch value is normal or more condensed, we want to
  // start with a descending search, otherwise we should do ascending.
  var dir = weight < 400 ? -1 : 1;
  var match = searchFromPivot(matchingSet, fontWeights, pivot, dir);

  if (!match) {
    // Since a font-family cannot exist without having at least one stretch value
    // we should never reach this point.
    throw new Error(
      "Could not find a matching font-weight for value " + weight
    );
  }

  return match;
}