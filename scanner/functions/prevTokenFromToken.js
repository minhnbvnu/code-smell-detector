function prevTokenFromToken(tokenList, curToken) {
  const tokenIndex = _.sortedIndexBy(tokenList, curToken, _.property('start'))

  let prevTokenIndex = tokenIndex - 1
  while (prevTokenIndex >= 0 && tokenList[prevTokenIndex].channel !== 0) {
    prevTokenIndex -= 1
  }

  return tokenList[prevTokenIndex]
}