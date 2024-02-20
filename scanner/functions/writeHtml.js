function writeHtml(chunks) {
  let html = writeHtmlAsDom(chunks)

  // fragments don't have an innerHTML method so we need to wrap it in another container first
  let container = document.createElement('div')
  container.appendChild(html)
  return container.innerHTML
}