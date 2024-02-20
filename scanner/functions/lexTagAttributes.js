function lexTagAttributes(state) {
  const { str, position, tokens } = state
  let cursor = position.index
  let quote = null // null, single-, or double-quote
  let wordBegin = cursor // index of word start
  const words = [] // "key", "key=value", "key='value'", etc
  const len = str.length
  while (cursor < len) {
    const char = str.charAt(cursor)
    if (quote) {
      const isQuoteEnd = char === quote
      if (isQuoteEnd) {
        quote = null
      }
      cursor++
      continue
    }

    const isTagEnd = char === '/' || char === '>'
    if (isTagEnd) {
      if (cursor !== wordBegin) {
        words.push(str.slice(wordBegin, cursor))
      }
      break
    }

    const isWordEnd = isWhitespaceChar(char)
    if (isWordEnd) {
      if (cursor !== wordBegin) {
        words.push(str.slice(wordBegin, cursor))
      }
      wordBegin = cursor + 1
      cursor++
      continue
    }

    const isQuoteStart = char === "'" || char === '"'
    if (isQuoteStart) {
      quote = char
      cursor++
      continue
    }

    cursor++
  }
  jumpPosition(position, str, cursor)

  const wLen = words.length
  const type = 'attribute'
  for (let i = 0; i < wLen; i++) {
    const word = words[i]
    const isNotPair = word.indexOf('=') === -1
    if (isNotPair) {
      const secondWord = words[i + 1]
      if (secondWord && startsWith(secondWord, '=')) {
        if (secondWord.length > 1) {
          const newWord = word + secondWord
          tokens.push({ type, content: newWord })
          i += 1
          continue
        }
        const thirdWord = words[i + 2]
        i += 1
        if (thirdWord) {
          const newWord = word + '=' + thirdWord
          tokens.push({ type, content: newWord })
          i += 1
          continue
        }
      }
    }
    if (endsWith(word, '=')) {
      const secondWord = words[i + 1]
      if (secondWord && !stringIncludes(secondWord, '=')) {
        const newWord = word + secondWord
        tokens.push({ type, content: newWord })
        i += 1
        continue
      }

      const newWord = word.slice(0, -1)
      tokens.push({ type, content: newWord })
      continue
    }

    tokens.push({ type, content: word })
  }
}