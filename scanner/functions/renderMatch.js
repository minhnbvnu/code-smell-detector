function renderMatch(match, preTag, postTag) {
  // Search results are returned as a text blob with the hits wrapped in
  // triple mustaches. Hits occasionally include text beyond the search
  // term, so everything within the staches is captured and wrapped.
  const preTagRe = escapeRegExp(escapeHTML(preTag));
  const postTagRe = escapeRegExp(escapeHTML(postTag));
  // [^] matches any character, including line breaks
  const regex = new RegExp(`${preTagRe}([^]+?)${postTagRe}`, 'g');
  return escapeHTML(match)
    .replace(regex, '<mark>$1</mark>')
    // Fix trailing hyphens. This over-corrects but is net useful.
    .replace(/(\b)- /g, '$1');
}