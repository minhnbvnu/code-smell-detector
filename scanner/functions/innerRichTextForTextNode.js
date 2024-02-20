function innerRichTextForTextNode(node, nodeStyle, chunks, nodeAttributes, trailingSpace) {
  if(_.isUndefined(trailingSpace)) trailingSpace = false

  let inSet = (c, setString) => setString.indexOf(c) > -1

  let advanceUntilNotInSet = (data, position, setString) => {
    let consume = true
    while(consume && position < data.length) {
      if(!inSet(data.charAt(position), setString)) {
        consume = false
      } else {
        position++
      }
    }
    return position
  }

  let lastChunk = chunks.length > 0 ? chunks[chunks.length - 1] : null
  // child is text, step #2
  let data = node.data
  // child is text, step #3
  let whitespace = nodeStyle.getPropertyValue('white-space')
  let whitespaceCollapse = whitespace === 'normal' || whitespace === 'nowrap' || whitespace === 'pre-line'
  if(whitespaceCollapse) {
    // child is text, step #4 - 1
    let whitespaceChars = whitespace === 'normal' || whitespace === 'nowrap' ? SPACE_CHARS : SPACE_CHARS_EXCEPT_LF
    // child is text, step #4 - 2
    let position = 0
    // child is text, step #4 - 3
    let newData = ''
    // child is text, step #4 - 4
    while(position < data.length) {
      let c = data.charAt(position)
      if(whitespaceChars.indexOf(c) > -1) {
        // child is text, step #4 - 4 - 1
        newData += ' '
        position++
        position = advanceUntilNotInSet(data, position, whitespaceChars)
      } else if(c === '\n') {
        // child is text, step #4 - 4 - 2
        if(newData.length > 0 && newData.charAt(newData.length - 1) === ' ') {
          newData = newData.slice(0, newData.length - 1)
        }
        newData += '\n'
        position++
        position = advanceUntilNotInSet(data, position, whitespaceChars)
      } else {
        // child is text, step #4 - 4 - 3
        newData += c
        position++
      }
    }
    // child is text, step #4 - 5
    data = newData
  }
  // child is text, step #5
  if(trailingSpace && (data.length === 0 || !inSet(data.charAt(0), SPACE_CHARS)) && lastChunk) {
    lastChunk.text += ' '
  }
  // child is text, step #6
  if((!lastChunk || lastChunk.text.length === 0 || inSet(lastChunk.text.charAt(lastChunk.text.length - 1), SPACE_CHARS))
    && (data.length > 0 && data.charAt(0) === ' ')
    && whitespaceCollapse) {
    data = data.slice(1)
  }
  // child is text, step #7
  if(whitespaceCollapse && (data.length > 0 && data.charAt(data.length - 1) === ' ')) {
    data = data.slice(0, data.length - 1)
    trailingSpace = true
  } else {
    trailingSpace = false
  }

  // child is text, step #8
  // ignore text-transform
  let textTransform = nodeStyle.getPropertyValue('text-transform')
  if(textTransform !== 'none' && textTransform !== 'normal') {
    console.warn(`Unsupported text-transform ${textTransform} during HTML parsing, ignoring.`)
  }

  // child is text, step #9
  if(data.length > 0) {
    chunks.push({
      text: data,
      attrs: nodeAttributes
    })
  }
  return trailingSpace
}