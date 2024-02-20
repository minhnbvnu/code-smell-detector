function resolveFontStyle(fontStyle, matchingSet) {
  if (matchingSet[fontStyle]) {
    return matchingSet[fontStyle];
  }

  var ordering = fontStyleOrder[fontStyle];

  for (var i = 0; i < ordering.length; ++i) {
    if (matchingSet[ordering[i]]) {
      return matchingSet[ordering[i]];
    }
  }

  // Since a font-family cannot exist without having at least one style value
  // we should never reach this point.
  throw new Error("Could not find a matching font-style for " + fontStyle);
}