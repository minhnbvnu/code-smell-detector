function getVersion() {
  let query = parseQuery(window.location.search);
  return query.version || 'local';
}