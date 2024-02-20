function formatHtmlInvalidReferences(references) {
  return [
    '<span title="Invalid reference(s)" class="invalid-ref">',
    references,
    '</span>',
  ].join('');
}