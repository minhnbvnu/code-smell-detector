function innerRichText(node, chunks, trailingSpace) {
  let nodeAttributes = attributesForElement(node)
  for(let i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i]
    let ignored = ignoredNode(child)
    if (!ignored && child.nodeType === Node.TEXT_NODE) {
      // child is text, step #1
      let nodeStyle = getComputedStyle(node, null)
      if(nodeStyle.getPropertyValue('visibility') !== 'hidden') {
        trailingSpace = innerRichTextForTextNode(child, nodeStyle, chunks, nodeAttributes, trailingSpace)
      }
    } else if (!ignored && child.nodeType === Node.ELEMENT_NODE) {
      // child is element, step #1
      let lastChunk = chunks.length > 0 ? chunks[chunks.length - 1] : null
      if(lastChunk && lastChunk.text.length > 0 && lastChunk.text.charAt(lastChunk.text.length - 1) !== '\n') {
        let leadingWhitespace = elementLeadingWhitespace(child)
        if(leadingWhitespace && leadingWhitespace.length > 0) {
          lastChunk.text += leadingWhitespace
          trailingSpace = false
        }
      }

      // child is element, step #2
      trailingSpace = innerRichText(child, chunks, trailingSpace)

      // child is element, step #3 (with addition to special-case br tag)
      if(child.nodeName === 'BR') {
        chunks.push({
          text: '\n',
          attrs: nodeAttributes
        })
        trailingSpace = false
      } else if (elementHasNonIgnoredSiblingElement(child)) {  // we ignore BR's here too, special cased above
        // a sibling node that is not an ignored node, so we need our trailing whitespace
        lastChunk = chunks.length > 0 ? chunks[chunks.length - 1] : null
        let trailingWhitespace = elementTrailingWhitespace(child)
        if (trailingWhitespace && trailingWhitespace.length > 0) {
          if(!lastChunk) {
            lastChunk = {
              text: '',
              attrs: nodeAttributes
            }
            chunks.push(lastChunk)
          }
          lastChunk.text += trailingWhitespace
          trailingSpace = false
        }
      }
    }
  }
  return trailingSpace
}