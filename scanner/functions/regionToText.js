function regionToText (region, levels = LEVEL_KEYS) {
  return levels
    .map(val => region[val] && region[val].value)
    .filter(val => val)
}