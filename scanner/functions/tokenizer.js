function tokenizer(chars, wordOptions) {
  let word = _.isArray(chars) ? chars.join('') : chars
  let result
  let tokenRanges = []
  // by default if our options include leading spaces but trailing is not specified, turn off trailing
  if(wordOptions && wordOptions.includeLeadingSpace && !wordOptions.includeTrailingSpace) {
    wordOptions.includeTrailingSpace = false
  }
  wordOptions = _.merge({}, DEFAULT_WORD_OPTIONS.en, wordOptions)

  let createTokenRange = function(start, end, isWord) {
    tokenRanges.push({start: start, end: end, isWord: isWord})
  }

  // Match words and mark characters
  let lastWordEnd = 0
  let wordStart
  let wordEnd
  while ((result = wordOptions.wordRegex.exec(word))) {
    wordStart = result.index
    wordEnd = wordStart + result[0].length

    // Get leading space characters for word
    if (wordOptions.includeLeadingSpace) {
      while (isWhitespace(chars[wordStart - 1])) {
        --wordStart
      }
    }

    // Create token for non-word characters preceding this word
    if (wordStart > lastWordEnd) {
      createTokenRange(lastWordEnd, wordStart, false)
    }

    // Get trailing space characters for word
    if (wordOptions.includeTrailingSpace) {
      while (isWhitespace(chars[wordEnd])) {
        ++wordEnd
      }
    }
    createTokenRange(wordStart, wordEnd, true)
    lastWordEnd = wordEnd
  }

  // Create token for trailing non-word characters, if any exist
  if (lastWordEnd < chars.length) {
    createTokenRange(lastWordEnd, chars.length, false)
  }

  return tokenRanges
}