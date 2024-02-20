function nextTokenFromToken(tokenList, curToken) {
  const tokenIndex = _.sortedIndexBy(tokenList, curToken, _.property('start'))

  let nextTokenIndex = tokenIndex + 1
  while (nextTokenIndex < tokenList.length && tokenList[nextTokenIndex].channel !== 0) {
    nextTokenIndex += 1
  }

  return tokenList[nextTokenIndex]
}