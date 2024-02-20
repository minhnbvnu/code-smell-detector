function formatHtmlReferences(citations) {
  return `(${citations.map(c => c.htmlKey).join('; ')})`;
}