function _footnote_tag(tokens, idx) {
  return '<span data-type="footnote">'+tokens[idx].meta.label+'</span>';
}