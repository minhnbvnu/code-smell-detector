function striptags(html) {
  return String(html).replace(/<\/?([^>]+)>/g, '');
}