function writeText(chunks) {
  let text = ''

  if(!chunks) {
    chunks = []
  }

  chunks.forEach(c => {
    text += c.text
  })

  return text
}