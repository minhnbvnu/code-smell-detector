function lineContainingChar(searchSpace, charOrId, nextIfEol) {
  if(_.isUndefined(nextIfEol)) nextIfEol = false

  if(!searchSpace || searchSpace.length === 0) {
    return {
      line: EMPTY_LINE,
      index: -1,
      endOfLine: null
    }
  }

  // shortcut searches at the beginning or end of the searchSpace, this is used often and these comparisons are fast
  if(charEq(searchSpace[0].start, charOrId)) {
    return {
      line: searchSpace[0],
      index: 0,
      endOfLine: !charEq(charOrId, BASE_CHAR)
    }
  } else if(charEq(searchSpace[searchSpace.length - 1].end, charOrId)) {
    return {
      line: searchSpace[searchSpace.length - 1],
      index: searchSpace.length - 1,
      endOfLine: true
    }
  }

  for(let i = 0; i < searchSpace.length; i++) {
    let line = searchSpace[i]
    if(line.hasChar(charOrId)) {
      let index = i
      let endOfLine = charEq(charOrId, line.end)
      if(nextIfEol && endOfLine && !line.isEof() && searchSpace.length - 1 > i) {
        index++
        line = searchSpace[index]
      }

      return {
        line: line,
        index: index,
        endOfLine: endOfLine
      }
    }
  }

  return null
}