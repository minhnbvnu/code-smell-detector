function formatHtmlKey(authors, year) {
  if (0 === authors.length) {
    return `${UNKNOWN_AUTHORS}, ${year}`;
  }

  if (MAX_AUTHORS_IN_REFS >= authors.length) {
    return `${authors.map(a => a.lastname).join(' & ')}, ${year}`;
  }

  return `${authors[0].lastname} <em>et al.</em>, ${year}`;
}