function parseHtml(html, tempContainer) {
  let parser = new DOMParser()
  let doc = parser.parseFromString(html, 'text/html')

  let chunks = []

  // IE does not give us an empty body, only a null one, shortcut the subsequent logic in this case
  if(!doc.body) {
    return chunks
  }

  insertIntoContainer(doc.body, tempContainer)

  try {
    innerRichText(tempContainer, chunks)
  } finally {
    emptyNode(tempContainer)
  }

  return chunks
}