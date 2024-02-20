function _updateDestinations(destinations, id, result) {
  if (result === NO_MATCH) {
    // No match, no-op.
  } else if (result) {
    destinations |= id // Positive match, add it in.
  } else {
    destinations &= ~id // Negative match, remove it.
  }

  return destinations
}