function hasDiff(token1, token2, indent) {
  return token1.start - token2.stop === indent || !onSameLine(token1, token2)
}