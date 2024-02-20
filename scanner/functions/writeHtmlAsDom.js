function writeHtmlAsDom(chunks) {
  let html = document.createDocumentFragment()

  if(!chunks) {
    chunks = []
  }

  let pendingChunks = []

  let pushToHtml = fragment => {
    html.appendChild(fragment)
  }

  let createSpan = chunk => {
    let textNode = document.createTextNode(chunk.text)
    let span = document.createElement('SPAN')
    span.appendChild(textNode)
    setStyle(span, styleForAttributes(chunk.attrs), true)
    return span
  }

  let pushBreakToHtml = () => {
    pushToHtml(document.createElement('BR'))
  }

  let pushSpansToHtml = () => {
    if(pendingChunks.length === 0) {
      return
    }
    let spans = pendingChunks.map(createSpan)
    let fragment = document.createDocumentFragment()
    spans.forEach(s => fragment.appendChild(s))
    pushToHtml(fragment)
    pendingChunks = []
  }

  let pushParaToHtml = () => {
    if(pendingChunks.length === 0) {
      return
    }
    let para = document.createElement('P')
    if(pendingChunks.length > 1) {
      // encapsulate chunks in styled spans
      let spans = pendingChunks.map(createSpan)
      spans.forEach(s => para.appendChild(s))
    } else if(pendingChunks.length === 1) {
      // encapsulate chunk in styled para
      let textNode = document.createTextNode(pendingChunks[0].text)
      para.appendChild(textNode)
      setStyle(para, styleForAttributes(pendingChunks[0].attrs), true)
    }
    pushToHtml(para)
    pendingChunks = []
  }

  let newlineCount = 0
  let paraClean = true

  let handleNewlines = (atEnd) => {
    if(newlineCount > 0) {
      if(newlineCount >= 2) {
        // a bunch of newlines in a row, we need to push a paragraph for the first two and assume the rest are breaks
        // see http://www.w3.org/TR/html5/dom.html#palpable-content
        pushParaToHtml(pendingChunks)
        paraClean = false
        if(atEnd) {
          // add line breaks too
          while(newlineCount > 0) {
            pushBreakToHtml()
            newlineCount--
          }
        } else {
          newlineCount -= 2
        }
      }
      // treat any more newlines as line breaks
      while(newlineCount > 0) {
        pushSpansToHtml(pendingChunks)
        pushBreakToHtml()
        newlineCount--
      }
    }
  }

  chunks.forEach(c => {
    if(c.text === '\n') {
      newlineCount++
    } else {
      handleNewlines(false)
      pendingChunks.push(c)
    }
  })

  // trailing newlines
  handleNewlines(true)

  if(paraClean) {
    pushSpansToHtml(pendingChunks)
  } else {
    pushParaToHtml(pendingChunks)
  }

  return html
}