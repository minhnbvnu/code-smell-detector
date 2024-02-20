function formatHtmlCitations(citations) {
  return citations
    .map(c => `<p class="citation">${c.html}</p>`)
    .join('\n')
    .concat('\n')
  ;
}